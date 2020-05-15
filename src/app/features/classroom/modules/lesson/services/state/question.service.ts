import { Injectable } from '@angular/core';
import {QuestionGroup} from '../../models/lesson/questionGroup';
import {Question} from '../../models/lesson/question';
import {QuestionHandler} from '../../classes/QuestionHandler';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questions: (Question | QuestionGroup)[] = [];
  handlers: QuestionHandler[] = [];

  constructor() { }

  addQuestionHandler(handler: QuestionHandler) {
    this.handlers.push(handler);
    this.questions.push(handler.questionGroup);
  }

  getQuestionOrGroupDeep(id: string): Question | QuestionGroup | undefined {

    for (const handler of this.handlers) {
      const res = handler.questionGroup.getQuestionOrGroupDeep(id);
      if (res !== undefined) {
        return res;
      }
    }
    return undefined;
  }

}
