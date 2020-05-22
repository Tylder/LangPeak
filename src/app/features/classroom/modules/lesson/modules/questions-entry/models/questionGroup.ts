import {merge, Observable, Subject} from 'rxjs';
import {Question} from './question';
import {every, map, tap} from 'rxjs/operators';
import {FormGroup, ValidatorFn} from '@angular/forms';
import {QuestionData} from '../../../models/db/lesson';
import {QuestionHandler} from '../classes/questionHandler';

function _createControls(questions: QuestionData[],
                         questionValidators?: ValidatorFn | ValidatorFn[] | null,
                         questionHandler?: QuestionHandler): { [key: string]: (Question | QuestionGroup) } {

  /**
   * Takes an array of questionData and validators and returns an object with the id of the questions-entry as key and the question as value
   * must be a separate function outside the class because we must call it before we call the Super on the class.
   */

  const tempControls = {};

  questions.forEach((qData, index) => {
    console.log(qData);
    if (!('questions' in qData) || qData?.questions.length === 1) {
      const question = new Question(qData, null, null, questionHandler);
      question.setValidators(questionValidators);
      question.updateValueAndValidity();
      tempControls[qData.id] = question;
    }
    else if (qData.questions.length > 1) {
      tempControls[qData.id] = new QuestionGroup(qData.questions, qData, questionValidators, questionHandler);
    }
  });
  return tempControls;
}


export class QuestionGroup extends FormGroup {
  /**
   * Handles all but the view of a question, a question is a singular thing, cannot contain multiple questions-entry
   * To group questions-entry use a QuestionGroup
   * E.X a fill the blank with multiple blanks in a sentence would group several questions-entry into a QuestionGroup and then that Group
   * could be a part of an even bigger group containing groups.
   */

  data: QuestionData;
  questionHandler: QuestionHandler;

  // tslint:disable-next-line:variable-name
  constructor(questions: QuestionData[], _questionData?: QuestionData,
              questionValidators?: ValidatorFn | ValidatorFn[] | null,
              questionHandler?: QuestionHandler) {

    super(_createControls(questions, questionValidators, questionHandler));

    if (_questionData !== undefined) {
      this.data = _questionData;
    }
    this.questionHandler = questionHandler;
  }



  // reset(value?: any,
  //       options?: { onlySelf?: boolean; emitEvent?: boolean; }): void {
  //
  //
  //
  //   super.reset(value, options);
  // }

  addQuestions(questions: QuestionData[], questionValidators?: ValidatorFn | ValidatorFn[] | null) {

    const tempControls = _createControls(questions, questionValidators, this.questionHandler);
    Object.keys(tempControls).forEach(key => {
      this.addControl(key, tempControls[key]);
    });
  }

  getQuestionsAndGroups(): (Question | QuestionGroup)[] {
    /**
     * Returns all questions-entry and groups in the group, its like a one step down ls
     */

    const tempControls: (Question | QuestionGroup)[] = [];

    Object.keys(this.controls).filter(key => {
      return (this.controls[key] instanceof Question || this.controls[key] instanceof QuestionGroup);
    }).forEach(key => {
      if (this.controls[key] instanceof Question) { tempControls.push(this.controls[key] as Question);  }
      else if (this.controls[key] instanceof QuestionGroup) { tempControls.push(this.controls[key] as QuestionGroup);  }
    });

    return tempControls;
  }


  getQuestionsDeep(): (Question | undefined)[] {

    /**
     * Similar to getQuestions but goes through question groups as well to get all questions-entry,
     * returns no groups, good when we want to find a question no matter how deep
     */
    let questions: Question[] = [];

    this.getQuestionsAndGroups().forEach(q => {
      if (q instanceof QuestionGroup) {
        questions = questions.concat(q.getQuestionsDeep());
      } else {
        questions.push(q);
      }
    });

    return questions;
  }

  getQuestionOrGroup(id: string): Question | QuestionGroup | undefined {
    /**
     * Searches the group for a question or group with the id, doesnt check inside groups
     * use getQuestionOrGroupDeep if you want to search in side groups
     */
    return this.getQuestionsAndGroups().filter((q) => {
      return q.data.id === id;
    })[0];
  }

  getQuestionOrGroupDeep(id: string): Question | QuestionGroup | undefined {

    for (const q of this.getQuestionsAndGroups()) {

      if (q.data.id === id) {
        return q; // found it
      }

      if (q instanceof QuestionGroup) {
        const res = q.getQuestionOrGroupDeep(id);  // check one level lower
        if (res !== undefined) { // propagate res up
          return res; // return deeper result
        }
      }
    }
    return undefined; // none founds
  }

  setQuestionValidators(newValidator: ValidatorFn | ValidatorFn[] | null): void {
    /**
     *  Sets the Validators on the each control in the group, only on the top level questions-entry, not in each group
     */
    const questions = this.getQuestionsAndGroups();

    questions.forEach((question) => {
      question.setValidators(newValidator);
      question.updateValueAndValidity();
    });
  }

  fillCorrectValuesDeep() {
    this.getQuestionsDeep().forEach((question) => question.fillCorrectValue());
  }

}
