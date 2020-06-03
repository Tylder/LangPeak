import {QuestionData} from '../../../../../shared/models/lesson';
import {ValidatorFn} from '@angular/forms';
import {UtilsService} from '../../../../../shared/services/utils.service';
import {QuestionGroup} from '../models/questionGroup';
import {Question} from '../models/question';
import {merge, Observable} from 'rxjs';
import {filter, map, pairwise, startWith, tap} from 'rxjs/operators';
// @ts-ignore
import * as deepEqual from 'fast-deep-equal';
import * as faker from 'faker';
/**
 * Handles question groups, takes an array of QuestionData and returns a QuestionGroup.
 * Controls how many questions-entry to include in the array, remove and add questions-entry.
 * Register the handler with the QuestionsService to make it available module wide.
 */


export enum QuestionGroupChangeType {
  ADDED = 'added',
  REMOVED = 'removed',
  VALUE_CHANGE = 'valueChanged',
  // STATUS_CHANGE = 'statusChanged'
}

export interface QuestionGroupChange {
  type: QuestionGroupChangeType;
  questions: Question[];
  // changes: {
  //
  // }
}

export class QuestionHandler {

  // equal = require('fast-deep-equal/es6');

  questionsData: QuestionData[];

  shownQuestionsData: QuestionData[] = [];

  questionGroup: QuestionGroup;

  questionsGroupChange$: Observable<QuestionGroupChange>;

  questionValidators?: ValidatorFn | ValidatorFn[] | null;

  id = faker.random.uuid();

  data: {[k: string]: any} = {};

  constructor(private utilsService: UtilsService,
              questions: QuestionData[],
              amountToInclude: number,
              questionValidators?: ValidatorFn | ValidatorFn[] | null) {

    this.questionsData = questions;
    // this.questionsData.forEach(questionData => {
    //   questionData.temp = { questionHandler: this };
    // });

    this.questionValidators = questionValidators;

    this.shownQuestionsData = this.pickQuestions(amountToInclude);

    this.questionGroup = new QuestionGroup(this.shownQuestionsData,
                              undefined,
                                           questionValidators,
                                           this);

    this.questionsGroupChange$ = merge(this.getQuestionsAddedOrRemoved$(), this.getQuestionsValueChanged$());
    this.questionsGroupChange$.subscribe(val => { console.log(val); });
  }

  flattenObject(value: {}) {
    const toReturn = {};

    for (const i in value) {
      if (!value.hasOwnProperty(i)) { continue; }

      if ((typeof value[i]) === 'object' && value[i] !== null) {
        const flatObject = this.flattenObject(value[i]);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) { continue; }

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = value[i];
      }
    }
    return toReturn;
  }

  getQuestionsValueChanged$(): Observable<any> {
    return this.questionGroup.valueChanges.pipe(
      startWith(this.questionGroup.value),
      map(val => this.flattenObject(val)),
      pairwise(),
      tap(val => console.log(val)),
      filter(([previousValues, currentValues]: {}[], index) => { // excludes add and remove
        // return previousQuestions.length === currentQuestions.length;
        return Object.keys(previousValues).length === Object.keys(currentValues).length;
      }),
      map(([a, b]) => {

        const questions = Object.keys(b).filter(key => {
          // return !deepEqual(a[key], b[key]);
          return a[key] !== b[key];
        }).map(key => {
          const questionKeySplits = key.split('.');
          const questionKey = questionKeySplits[questionKeySplits.length - 1]; // last one
          return this.questionGroup.getQuestionOrGroupDeep(questionKey) as Question;
        });

        return {
          type: QuestionGroupChangeType.VALUE_CHANGE,
          questions
        };
      }),
    );
  }

  getQuestionsAddedOrRemoved$(): Observable<QuestionGroupChange> {
    return this.questionGroup.valueChanges.pipe(
      startWith(this.questionGroup.getQuestionsDeep()),
      map(() => this.questionGroup.getQuestionsDeep()),
      pairwise(), // get last 2 questionsGroups
      // tap(val => console.log(val)),
      filter(([previousQuestions, currentQuestions]: Question[][], index) => { // skip all non changes to the questions
        return previousQuestions.length !== currentQuestions.length;
      }),
      map(([previousQuestions, currentQuestions]: Question[][]) => {
        const removed = previousQuestions.filter(item => currentQuestions.indexOf(item) < 0);
        const added = currentQuestions.filter(item => previousQuestions.indexOf(item) < 0);

        if (added.length > 0) {
          return {
            type: QuestionGroupChangeType.ADDED,
            questions: added
          };
        } else {
          return {
            type: QuestionGroupChangeType.REMOVED,
            questions: removed
          };
        }
      })
    );
  }

  pickQuestions(amount: number): QuestionData[] {
    /**
     * Returns an array of QuestionData picked from this.questionsData based on whatever algo you make
     * TODO make it pick based on priority set in the questionData based on the popularity of the question
     */

    const questions: QuestionData[] = [];

    // console.log(this.getQuestionsNotInQuestionsGroup());

    let questionsNotUsed = this.getQuestionsNotInQuestionsGroup();
    console.log(questionsNotUsed);

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
    // Todo update the state of the group to reflect the shown questions-entry

    let question: QuestionData;
    if (id !== undefined) {
      question = this.questionsData.filter((qData) => {
        return qData.id === id;
      })[0];
    } else {
      question = this.pickQuestions(1)[0];

      if (question === undefined) {  // no more questions-entry
        return null;
      }
    }

    this.shownQuestionsData.push(question);

    let validators: ValidatorFn | ValidatorFn[] | null;
    if (questionValidators !== undefined) {
      validators = questionValidators;
    } else {
      validators = this.questionValidators;
    }

    this.questionGroup.addQuestions([question], validators);

    return question;
  }

  setQuestionAmount(amount: number) {

    const currentQuestions = this.questionGroup.getQuestionsAndGroups();

    if (amount === currentQuestions.length) {
      return;
    } else if (amount > currentQuestions.length) {
      for (let i = 0; i < amount - currentQuestions.length; i++) {
        this.addQuestion();
      }
    } else if (amount < currentQuestions.length) {
      for (let i = 0; i < currentQuestions.length - amount; i++) {
        const question = currentQuestions[currentQuestions.length - (1 + i)]; // remove last question
        this.removeQuestion(question.data.id);
      }
    }
  }


  removeQuestion(id: string) {
    // Todo update the state of the group to reflect the shown questions-entry

    this.questionGroup.removeControl(id);
    const index = this.shownQuestionsData.findIndex((question) => question.id === id);
    this.shownQuestionsData.splice(index, 1);
  }
}
