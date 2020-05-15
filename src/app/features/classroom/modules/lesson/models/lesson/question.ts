import {Observable} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {QuestionData, QuestionState} from '../db/lesson';

export function correctValueValidator(q: Question): { [key: string]: any } {

  let isValid = false;
  if (typeof q.data.correctValue === 'string' && q.value !== null) {
    isValid = q.data.correctValue.toLowerCase() === q.value.toString().toLowerCase();
  } else {
    isValid = q.value === q.data.correctValue;
  }
  return isValid ? null : { incorrectValue: {value: q.value} };
}


export class Question extends FormControl {
  /**
   * Handles all but the view of a question, a question is a singular thing, cannot contain multiple questions
   * To group questions use a QuestionGroup
   * E.X a fill the blank with multiple blanks in a sentence would group several questions into a QuestionGroup and then that Group
   * could be a part of an even bigger group containing groups.
   */

  data: QuestionData;
  // data: QuestionData = { // default values if none given
  //   correctValue: 'not given',
  //   state: {
  //     isValid: false,
  //     isDirty: false,
  //     currentValue: null,
  //     pastGuesses: [],
  //     isShow: false,
  //   }
  // };

  constructor(questionData: QuestionData, validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
    super(null, validator, asyncValidator);

    this.data = questionData;
    //
    // if (questionData !== undefined) {
    //   this.data = questionData;
    // }
    // this.valueChanges.pipe();
  }

  fillCorrectValue() {
    this.setValue(this.data.correctValue);
  }



  // private validator() {
  //   if (Array.isArray(this.data.correctValue)) {
  //     this.data.isValid = this.data.correctValue.includes(this.data.currentValue);
  //   } else {
  //     this.data.isValid = this.data.currentValue === this.data.correctValue;
  //   }
  // }
}
