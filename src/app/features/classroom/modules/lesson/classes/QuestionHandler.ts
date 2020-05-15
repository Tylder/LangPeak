import {QuestionData} from '../models/db/lesson';
import {ValidatorFn} from '@angular/forms';
import {UtilsService} from '../../../../../shared/services/utils.service';
import {QuestionGroup} from '../models/lesson/questionGroup';
import {correctValueValidator, Question} from '../models/lesson/question';
import {Type} from '@angular/core';

/**
 * Handles question groups, takes an array of QuestionData and returns a QuestionGroup.
 * Controls how many questions to include in the array, remove and add questions.
 * Register the handler with the QuestionsService to make it available module wide.
 */


export class QuestionHandler {

  questionsData: QuestionData[];

  shownQuestionsData: QuestionData[] = [];

  questionGroup: QuestionGroup;

  questionValidators?: ValidatorFn | ValidatorFn[] | null;

  constructor(private utilsService: UtilsService,
              questions: QuestionData[],
              amountToInclude: number,
              questionValidators?: ValidatorFn | ValidatorFn[] | null) {

    this.questionsData = questions;

    this.questionValidators = questionValidators;

    this.shownQuestionsData = this.pickQuestions(amountToInclude);

    this.questionGroup = new QuestionGroup(this.shownQuestionsData,
      undefined,
      questionValidators);

  }


  pickQuestions(amount: number): QuestionData[] {
    /**
     * Returns an array of QuestionData picked from this.questionsData based on whatever algo you make
     * TODO make it pick based on priority set in the questionData based on the popularity of the question
     */

    const questions: QuestionData[] = [];

    // console.log(this.getQuestionsNotInQuestionsGroup());

    let questionsNotUsed = this.getQuestionsNotInQuestionsGroup();

    for (let i = 0; i < amount; i++) {

      const pickedQuestion = this.utilsService.sampleArray(questionsNotUsed);
      questionsNotUsed = questionsNotUsed.filter(qData => qData.id !== pickedQuestion.id); // remove question for future iteration picks

      questions.push(pickedQuestion);
    }

    return questions;
  }

  getQuestionsNotInQuestionsGroup(): QuestionData[] {
    return this.questionsData.filter((value) => {
      return this.shownQuestionsData.includes(value) === false;
    });
  }

  addQuestion(id?: string, questionValidators?: ValidatorFn | ValidatorFn[] | null): QuestionData | null {
    // Todo update the state of the group to reflect the shown questions

    let question: QuestionData;
    if (id !== undefined) {
      question = this.questionsData.filter((qData) => {
        return qData.id === id;
      })[0];
    } else {
      question = this.pickQuestions(1)[0];

      if (question === undefined) {  // no more questions
        return null;
      }

      this.shownQuestionsData.push(question);
    }

    let validators: ValidatorFn | ValidatorFn[] | null;
    if (questionValidators !== undefined) {
      validators = questionValidators;
    } else {
      validators = this.questionValidators;
    }

    this.questionGroup.addQuestions([question], validators);

    return question;
  }

  removeQuestion(id: string) {
    // Todo update the state of the group to reflect the shown questions

    this.questionGroup.removeControl('q_' + id);
    this.questionGroup.removeControl('q_group_' + id);
    const index = this.shownQuestionsData.findIndex((question) => question.id === id);
    this.shownQuestionsData.splice(index, 1);
  }

}
