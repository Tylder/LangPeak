import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {BaseQuestionGroupContentComponent} from '../../../base-question-group/base-question-group-content.component';
import {Question} from '../../../../models/question';
import {UtilsService} from '../../../../../../../../shared/services/utils.service';
import {QuestionGroupChangeType} from '../../../../classes/questionHandler';
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject, ReplaySubject, Subscription} from 'rxjs';
import {CdkDragDrop, CdkDropList, CdkDropListGroup, DragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {DropListRef} from '@angular/cdk/drag-drop/drop-list-ref';

export interface QuestionAnswer {
  questionId: string;
  answer: string;
}


@Component({
  selector: 'app-drag-drop-blanks-group',
  templateUrl: './drag-drop-blanks-group.component.html',
  styleUrls: ['./drag-drop-blanks-group.component.scss']
})

export class DragDropBlanksGroupComponent extends BaseQuestionGroupContentComponent implements OnInit, OnDestroy {

  /**
   * The drag and drop is different from write input and drop down in that each question can interact with the other questions and
   * also the group as a whole by returning the value back to the group.
   *
   * I am solving this by listening for QuestionValue changes.
   * When we drag an alternative to a question that question set that as its fullValue.
   *
   * Here in the group we subscribe to that change and remove that alternative from any other questions.
   * We then reset
   *
   * Different ways the value can move around:
   *
   * 1. From park to a question. We can just catch the drop event in the question and update the droplistdata with transferArray and
   * use setValue() on the question.
   * 2. Question to Question, same as above but we also need to setValue(null) on the previous Question. This means that each question
   * needs to know when any other question changes value. We do that by using the getQuestionsValueChanged$() on questionHandler in each
   * question input.
   * 3.From anywhere to question that already has a value. The old value should be placed back in
   */

  answersInPark$: BehaviorSubject<QuestionAnswer[]>;
  questionValueChangesSub: Subscription;
  questionAddRemoveSub: Subscription;

  constructor(private utilsService: UtilsService,
              private dragAndDrop: DragDrop) {
    super();

  }

  ngOnInit(): void {

    const questions: {[k: string]: QuestionAnswer} = {};
    let initialAnswersInPark: QuestionAnswer[] = [];
    this.data.questionHandler.questionGroup.getQuestionsDeep().forEach(question => {
      initialAnswersInPark = initialAnswersInPark.concat(this.getAlternativesFromQuestion(question));
      // this.alternativesInPark = this.usedAlternatives;
    });

    this.answersInPark$ = new BehaviorSubject<QuestionAnswer[]>(initialAnswersInPark);
    this.data.questionHandler.data.dragAndDropParkAnswers$ = this.answersInPark$; // save this so it can be reached by the questions

    this.questionAddRemoveSub = this.listenForQuestionAddRemove();
    this.questionValueChangesSub = this.listenForQuestionValueChanges();
  }

  ngOnDestroy(): void {
    console.log('DND Destroy');
    this.questionAddRemoveSub.unsubscribe();
    this.questionValueChangesSub.unsubscribe();
  }

  listenForQuestionAddRemove(): Subscription {
    return this.data.questionHandler.getQuestionsAddedOrRemoved$().subscribe((val) => {
      if (val.type === QuestionGroupChangeType.ADDED) {

        let answersInParkAfterAdd = this.answersInPark$.getValue();

        val.questions.forEach((question) => {
          const alternativesAdded = this.getAlternativesFromQuestion(question);
          answersInParkAfterAdd = answersInParkAfterAdd.concat(alternativesAdded);
        });
        answersInParkAfterAdd = this.utilsService.shuffleArray(answersInParkAfterAdd); // shuffle

        this.answersInPark$.next(answersInParkAfterAdd);

      } else if (val.type === QuestionGroupChangeType.REMOVED) {
        val.questions.forEach((question) => {
          this.answersInPark$.next(this.getAlternativesAfterRemoveQuestion(question));
          // this.removeAlternatives(question);
        });
      }
    });
  }


  listenForQuestionValueChanges(): Subscription {
    /**
     * This is needed to catch changes made by outside forces, not from drag and drop...for example using setCorrectValue, reset or if
     * its updated using the state from example the student. We need to make sure the answersInPark stays updated.
     */

    return this.data.questionHandler.getQuestionsValueChanged$().pipe(
      map((changes) => changes.questions),
      tap((questions) => console.log(questions)),
    ).subscribe((questions: Question[]) => {
      questions.forEach((question) => {
        if (question.hasValue()) {  /// HAS VALUE
          let answer = question.fullValue;
          if (question.valid && question.fullValue === question.value) {
            // means that setCorrectValue has been used, which doesnt set the fullvalue set by drag and drop
            answer = this.createQuestionAnswer(question, answer);
          }
          this.removeAnswerFromPark(answer);
          this.removeAnswerFromOtherQuestions(answer, question);

          if (question.hasPreviousValue()) { // question value was overwritten so push the old value to the park
            console.log(question.previousFullValue);
            this.addAnswerToPark(question.previousFullValue);
          }

        } else { // NO VALUE

          if (question.hasPreviousValue()) { // question value was reset

            let previousAnswer = question.previousFullValue;
            if (question.previousFullValue === question.previousValue) {
              // means that setCorrectValue has been used, which doesnt set the fullvalue set by drag and drop
              previousAnswer = this.createQuestionAnswer(question, previousAnswer);
            }

            // console.log(question.previousFullValue);
            console.log(question, previousAnswer);
            this.addAnswerToPark(previousAnswer);
          }
        }
      });
    });
  }

  isQuestionAnswer(arg: any): arg is QuestionAnswer {
    return arg && arg.questionId && typeof arg.questionId === 'string';
  }

  createQuestionAnswer(question: Question, answer: string | QuestionAnswer | any): QuestionAnswer {

    let answerValue: string;
    if (this.isQuestionAnswer(answer)) {
      answerValue = answer.answer;
    } else {
      answerValue = answer;
    }

    return {
      questionId: question.data.id,
      answer: answerValue
    };
  }

  addAnswerToPark(answer: QuestionAnswer) {
    const currentAnswersInPark = this.answersInPark$.getValue();
    currentAnswersInPark.push(answer);
    this.answersInPark$.next(currentAnswersInPark);
  }

  removeAnswerFromPark(answer: QuestionAnswer) {
    const currentAnswersInPark = this.answersInPark$.getValue();
    const index = currentAnswersInPark.findIndex(a => a.answer === answer.answer && a.questionId === answer.questionId);
    console.log(index, 'answer: ', answer, 'park: ', currentAnswersInPark);
    if (index !== -1) {
      currentAnswersInPark.splice(index, 1);
      this.answersInPark$.next(currentAnswersInPark);
    }
  }

  removeAnswerFromOtherQuestions(answer: QuestionAnswer, question: Question) {
    const allQuestions = this.data.questionHandler.questionGroup.getQuestionsDeep();
    console.log(answer, question.fullValue);
    const questionsWithValue = allQuestions
      .filter((q) => q !== question) // filter self
      .filter((q) => q.hasValue())
      .filter((q) => {
        return q.fullValue.questionId === answer.questionId && q.fullValue.answer === answer.answer;
      }); // filter other answers
    console.log('answer: ', answer, 'questionsWithValue: ', questionsWithValue, 'q: ', question );
    questionsWithValue.forEach((q) => {
      q.setValue(null); // null other questions
    });


  }


  questionDragBackToParkArea(event: CdkDragDrop<any>) {

    // this.removeQuestionAltFromAllQuestions(event.previousContainer[event.previousIndex]);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else { //  came from a question
      const question = event.previousContainer.data as Question;
      console.log('Transferring item to new container');

      const currentAnswersInPark = this.answersInPark$.getValue();
      currentAnswersInPark.push(question.fullValue);
      this.answersInPark$.next(currentAnswersInPark);

      question.setValue(null);
    }

  }

  getAlternativesFromQuestion(question: Question): QuestionAnswer[] {

    const alternatives = this.getAlternativesToShowFromQuestion(question);

    const questionAlternatives: QuestionAnswer[] = [];
    alternatives.forEach((alt) => {
      questionAlternatives.push({questionId: question.data.id, answer: alt});
    });

    return questionAlternatives;
  }

  getAlternativesAfterRemoveQuestion(question: Question): QuestionAnswer[] {
    // this.usedAlternatives = this.usedAlternatives.filter((alt) => alt.questionId !== question.data.id);
    const currentAnswers = this.answersInPark$.getValue();
    return currentAnswers.filter((alt) => alt.questionId !== question.data.id);
  }


  getAlternativesToShowFromQuestion(question: Question): string[] {
    const alternatives = [question.data.correctValues[0]]; // set the correctValue as the first alt

    if (!('alternatives' in question.data)) { return alternatives; } //  no alternatives set

    for (let i = 0; i < 5; i++) {
      // console.log(i)

      if (Math.random() < 0.5) { //  some chance to show 1 more alt
        const altsRemaining = question.data.alternatives.filter(item => alternatives.indexOf(item) < 0);
        const randomALt = this.utilsService.sampleArray(altsRemaining);
        alternatives.push(randomALt);
      } else { break; }
    }

    return alternatives;
  }




}
