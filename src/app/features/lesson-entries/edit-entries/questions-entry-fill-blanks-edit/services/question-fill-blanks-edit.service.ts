import {Injectable, OnInit} from '@angular/core';
import {FillBlankTextQuestion} from '../../../display-entries/questions-entry/models/questionDataTypes';
import {Lesson2Service} from '../../../../../shared/services/lesson2.service';
import {LessonPartEntry, QuestionData} from '../../../../../shared/models/lesson';
import {map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject, merge, Observable, ReplaySubject, throwError, zip} from 'rxjs';
import { firestore as fs } from 'firebase';

export interface QuestionWord {
  text: string;
  isSelected?: boolean;
  isBlank: boolean;
  questionIndex: number; // the index of the sub question
  questionPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionFillBlanksEditService {

  entry$: ReplaySubject<LessonPartEntry>;
  selectedQuestion$: BehaviorSubject<FillBlankTextQuestion>;
  // questionInEditWords: BehaviorSubject<QuestionWord[]>;
  questions$: BehaviorSubject<FillBlankTextQuestion[]>;
  // questionWordsAll$: BehaviorSubject<QuestionWord[][]>;
  selectedWords$: BehaviorSubject<QuestionWord[]>;
  isBlankSelected$: BehaviorSubject<boolean>;

  constructor(private lesson2Service: Lesson2Service) {
    this.selectedQuestion$ = new BehaviorSubject<FillBlankTextQuestion>(null);
    // this.questionInEditWords = new BehaviorSubject<QuestionWord[]>(null);
    this.entry$ = new ReplaySubject<LessonPartEntry>(1);
    this.questions$ = new BehaviorSubject<FillBlankTextQuestion[]>([]);
    this.selectedWords$ = new BehaviorSubject<QuestionWord[]>([]);
    this.isBlankSelected$ = new BehaviorSubject<boolean>(false);
    // this.questionWordsAll$ = new BehaviorSubject<QuestionWord[][]>([]);

    this.selectedWords$.pipe(
      map(words => words.findIndex(w => w.isBlank) !== -1),
      // tap(isBlank => console.log(isBlank)),
    ).subscribe(this.isBlankSelected$);

    // this.questions$.pipe(
    //   map(questions => {
    //     const questionWordsAll: QuestionWord[][] = [];
    //     questions.forEach(question => {
    //       questionWordsAll.push(this.splitQuestionIntoWords(question));
    //     });
    //     return questionWordsAll;
    //   })
    // ).subscribe(this.questionWordsAll$);
    // this.selectedWords$ = new BehaviorSubject<QuestionWord[]>([]);

    // this.selectedWords$.subscribe(val => console.log(val));

    // this.questionInEdit.pipe(
    //   tap(q => console.log(q)),
    //   map(question => {
    //     if (question) { return this.splitQuestionIntoWords(question); }
    //   }),
    //   tap(words => console.log(words))
    // ).subscribe(words => this.questionInEditWords.next(words));

  }

  getQuestionFromSelectedWord$(): Observable<FillBlankTextQuestion> {
    return this.selectedWords$.pipe(
      tap(words => console.log(words)),
      mergeMap(words => {
        if (words.length <= 0) { return throwError('No selected words'); }
        else { return this.getQuestionFromWord$(words[0]); }
      }) // only one word selected if its a blank
    );
  }

  getQuestionFromWord$(word: QuestionWord): Observable<FillBlankTextQuestion> {

    const doc = this.lesson2Service.firestore.doc(word.questionPath);
    return this.lesson2Service.listenForDoc$<FillBlankTextQuestion>(doc);
  }

  toggleSelectWord(word: QuestionWord) {
    let words = this.selectedWords$.getValue();

    const isHasBlankSelected = words.findIndex(w => w.isBlank) !== -1;

    if (word.isBlank || isHasBlankSelected) { // reset
      words = [];
    }

    const oldWordIndex = words.findIndex(w => word === w);
    if (oldWordIndex > -1) { words.splice(oldWordIndex, 1); }
    else { words.push(word); }

    this.selectedWords$.next(words);
  }

  selectQuestion(question: FillBlankTextQuestion) {
    const prevSelectedQuestion = this.selectedQuestion$.getValue();
    if (prevSelectedQuestion !== question) {
      this.selectedWords$.next([]);
      this.selectedQuestion$.next(question);
    }

  }

  startPartEntryListener(entry: LessonPartEntry) {
    this.lesson2Service.listenForPartEntry$(entry.path, true).pipe(
      tap( e => {
        if ('data' in e && 'questions' in e.data) { this.questions$.next(e.data.questions); }
        else { this.questions$.next([]); }
      })
    ).subscribe(e => this.entry$.next(e));
  }

  addQuestionToEntry$(question: FillBlankTextQuestion): Observable<any> {

    console.log(question);

    return this.entry$.pipe(
      take(1),
      switchMap(entry => {
        return this.lesson2Service.addQuestion$(entry, question).pipe(
          tap(() =>  this.selectedQuestion$.next(question)),
        );
      })
    );
    // this.questions.push(question);
    // this.selectedQuestion = question;
  }

  addQuestionsToQuestion$(baseQuestion: QuestionData, questions: QuestionData[]): Observable<any> {

    const addQuestionObs: Observable<any>[] = [];

    // return this.lesson2Service.addQuestion$(baseQuestion, questions[0]);

    questions.forEach(q => {
      addQuestionObs.push(this.lesson2Service.addQuestion$(baseQuestion, q));
    });

    console.log(addQuestionObs);

    return zip(...addQuestionObs);
  }

  addAltToQuestion$(question: QuestionData, alt: string): Observable<any> {
    const data = {
      alternatives: fs.FieldValue.arrayUnion(alt)
    };
    return this.lesson2Service.updateDocByPath$(question.path, data);
  }

  addCorrectValueToQuestion$(question: QuestionData, correct: string): Observable<any> {
    const data = {
      correctValues: fs.FieldValue.arrayUnion(correct)
    };
    return this.lesson2Service.updateDocByPath$(question.path, data);
  }

  removeAltFromQuestion$(question: QuestionData, alt: string): Observable<any> {
    const data = {
      alternatives: fs.FieldValue.arrayRemove(alt)
    };
    return this.lesson2Service.updateDocByPath$(question.path, data);
  }

  removeCorrectValueFromQuestion$(question: QuestionData, correct: string): Observable<any> {
    const data = {
      correctValues: fs.FieldValue.arrayRemove(correct)
    };
    return this.lesson2Service.updateDocByPath$(question.path, data);
  }
  // removeBlankFromQuestion$(question: QuestionData) {
  //   if (question.path)
  // }

  getFillBlanksFromQuestionWords(questionWords: QuestionWord[]): FillBlankTextQuestion[] {

    /**
     * Only call this if there is atleast 1 selected word to be made a fillblank
     */

    const tempFillBlanks: {
      fillBlanks: string[];
      wordsBefore: string[];
      wordsAfter: string[];
    }[] = [];


    let isFoundSelected = false;
    let isFoundNonSelectedAfterSelected = false;

    let fillBlanks: string[] = [];
    let wordsBefore: string[] = [];
    let wordsAfter: string[] = [];

    if (questionWords.findIndex(w => w.isBlank) > -1) {
      console.log('previous blanks found');
    }

    questionWords.forEach((word, index) => {
      /**
       * Checks for an edge on each question word. An edge would be where we have found a blank and then
       * atleast on non blank and then another blank. That would mark the beginning of a new question;
       * Or the end of the words.
       */
      if (this.selectedWords$.getValue().includes(word)) { // selected found
        isFoundSelected = true;

        if (isFoundNonSelectedAfterSelected) { // new selected found after non selected..new question
          tempFillBlanks.push({fillBlanks, wordsBefore, wordsAfter});

          fillBlanks = [];
          wordsBefore = [];
          wordsAfter = [];
          isFoundNonSelectedAfterSelected = false;

          fillBlanks.push(word.text);
        } else {
          fillBlanks.push(word.text);
        }
      }
      else {
        if (isFoundSelected) { // current word isnt selected but we have found one in the past
          isFoundNonSelectedAfterSelected = true;
          wordsAfter.push(word.text);
        } else {
          wordsBefore.push(word.text);
        }
      }

    });

    if (tempFillBlanks.length === 0 || fillBlanks.length > 0) {
      tempFillBlanks.push({fillBlanks, wordsBefore, wordsAfter});
    }

    /////// END OF SPLITING INTO TEMP FILLBLANKS WORDS

    const questions: FillBlankTextQuestion[] = [];

    tempFillBlanks.forEach(split => {

      const fullText = split.wordsBefore
        .concat(split.fillBlanks, split.wordsAfter)
        .join(' ');

      const question: FillBlankTextQuestion = {
        fullText,
        index: this.questions$.getValue().length,
        correctValues: [split.fillBlanks.join(' ')],
      };

      if (split.wordsBefore.length > 0) { question.textBefore = split.wordsBefore.join(' '); }
      if (split.wordsAfter.length > 0) { question.textAfter = split.wordsAfter.join(' '); }

      questions.push(question);
    });

    console.log(questions);

    return questions;
  }

  updateQuestion$(question: FillBlankTextQuestion): Observable<any> {
    return this.lesson2Service.updateQuestion$(question);
  }

  splitQuestionIntoWords(question: FillBlankTextQuestion): QuestionWord[] {

    let questionWords: QuestionWord[] = [];

    if ('questions' in question) {
      question.questions.forEach((q, index) => {

        questionWords = questionWords
          .concat(this.splitTextIntoQuestionWords(q.textBefore, false, index, q.path));

        const fillBlank: QuestionWord = {
          text: q.correctValues[0],
          isBlank: true,
          questionIndex: index,
          questionPath: q.path
        };

        questionWords.push(fillBlank);

        // questionWords = questionWords
        //   .concat(this.splitTextIntoQuestionWords(q.correctValue, true, index));

        questionWords = questionWords
          .concat(this.splitTextIntoQuestionWords(q.textAfter, false, index, q.path));

      });
    } else if ('correctValues' in question && question.correctValues.length > 0) {
      questionWords = questionWords
        .concat(this.splitTextIntoQuestionWords(question.textBefore, false, 0, question.path));

      const fillBlank: QuestionWord = {
        text: question.correctValues[0],
        isBlank: true,
        questionIndex: 0,
        questionPath: question.path
      };

      questionWords.push(fillBlank);

      // questionWords = questionWords
      //   .concat(this.splitTextIntoQuestionWords(question.correctValue, true, 0));

      questionWords = questionWords
        .concat(this.splitTextIntoQuestionWords(question.textAfter, false, 0, question.path));
    } else { // means we didnt set any questions yet
      questionWords = questionWords
        .concat(this.splitTextIntoQuestionWords(question.fullText, false, 0, question.path));
    }


    return questionWords;
  }

  private splitTextIntoQuestionWords(text: string, isBlank: boolean, questionIndex: number, questionPath: string): QuestionWord[] {

    const questionWords: QuestionWord[] = [];

    if (text == null) { return questionWords; }

    text.split(' ').forEach(w => {
      w = w.replace(/\s/g, '');

      const word: QuestionWord = {
        text: w,
        isBlank,
        questionIndex,
        questionPath,
      };

      questionWords.push(word);
    });

    return questionWords;
  }

}
