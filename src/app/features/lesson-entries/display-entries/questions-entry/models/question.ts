import {Observable} from 'rxjs';
import {AbstractControl, AsyncValidatorFn, FormControl, ValidatorFn} from '@angular/forms';
import {QuestionData, QuestionState} from '../../../../../shared/models/lesson';
import {QuestionHandler} from '../classes/questionHandler';
import {pairwise} from 'rxjs/operators';

export function correctValueValidator(q: Question): { [key: string]: any } {

  let isValid = false;

  if (q.value != null) {
    const index = q.data.correctValues.findIndex((correctValue: string) => {
      return correctValue.toLowerCase() === q.value.toString().toLowerCase();
    });
    isValid = index > -1;
  }

  // if (typeof q.data.correctValue === 'string' && q.value !== null && q.value !== undefined) {
  //   isValid = q.data.correctValue.toLowerCase() === q.value.toString().toLowerCase();
  // } else {
  //   isValid = q.value === q.data.correctValue;
  // }
  return isValid ? null : { incorrectValue: {value: q.value} };
}


export class Question extends FormControl {
  /**
   * Handles all but the view of a question, a question is a singular thing, cannot contain multiple questions-entry
   * To group questions-entry use a QuestionGroup
   * E.X a fill the blank with multiple blanks in a sentence would group several questions-entry into a QuestionGroup and then that Group
   * could be a part of an even bigger group containing groups.
   */

  data: QuestionData;
  questionHandler: QuestionHandler;
  fullValue: any;

  valueChangesWithPrevious: Observable<any>;
  previousValue: any;
  previousFullValue: any;

  constructor(questionData: QuestionData,
              validator?: ValidatorFn,
              asyncValidator?: AsyncValidatorFn,
              questionHandler?: QuestionHandler) {
    super(null, validator, asyncValidator);

    this.data = questionData;
    this.questionHandler = questionHandler;

    //
    // if (questionData !== undefined) {
    //   this.data = questionData;
    // }
    // this.valueChanges.pipe();

    this.valueChangesWithPrevious = this.valueChanges.pipe(
      pairwise()
    );

    // this.valueChangesWithPrevious.subscribe(val => console.log(val));
  }

  setValue(value: any,
           options?: {onlySelf?: boolean;
                      emitEvent?: boolean;
                      emitModelToViewChange?: boolean;
                      emitViewToModelChange?: boolean; },
           fullValue?: any): void {

    /**
     * Extends the formcontrol setValue by adding the ability to add a fullValue, this could be anything and wont be used by the
     * standard validators.
     */

    console.log('SET VALUE', this.value);

    this.previousValue = this.value;
    this.previousFullValue = this.fullValue;

    this.fullValue = fullValue !== undefined ? fullValue : value;

    super.setValue(value, options);
  }

  reset(formState?: any,
        options?: { onlySelf?: boolean; emitEvent?: boolean; }): void {

    /**
     * Needed to overwrite the reset
     * in order to stop it overwriting this.value before I could save it in this.previousValue
     * We do not want to emit change on super.reset() because we need to set this.previousValue first.
     * We emit after setting it.
     */

    const savedCurrentValue = String(this.value);

    console.log('RESET VALUE', this.value, savedCurrentValue);

    // this.setValue(null, options);

    super.reset(formState, {onlySelf: true, emitEvent: false}); // do not emit since we need to set this.previousValue first
    this.previousValue = savedCurrentValue;
    this.updateValueAndValidity(options); // emits valuechange and statusChange
  }

  fillCorrectValue() {
    this.setValue(this.data.correctValues[0]);
  }

  hasValue(): boolean {
    return this.value !== null && this.value !== undefined;
  }

  hasPreviousValue(): boolean {
    return this.previousValue !== null && this.previousValue !== undefined;
  }


  // private validator() {
  //   if (Array.isArray(this.data.correctValue)) {
  //     this.data.isValid = this.data.correctValue.includes(this.data.currentValue);
  //   } else {
  //     this.data.isValid = this.data.currentValue === this.data.correctValue;
  //   }
  // }
}
