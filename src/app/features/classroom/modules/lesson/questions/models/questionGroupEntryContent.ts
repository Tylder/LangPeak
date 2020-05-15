import {Type} from '@angular/core';
import {QuestionHandler} from '../../classes/QuestionHandler';

export class QuestionGroupItem {
  constructor(public component: Type<any>,
              public questionHandler: QuestionHandler) {}
}
