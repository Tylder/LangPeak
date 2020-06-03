import { Injectable } from '@angular/core';
import {QuestionGroup} from '../../../../../lesson-entries/display-entries/questions-entry/models/questionGroup';
import {Question} from '../../../../../lesson-entries/display-entries/questions-entry/models/question';
import {QuestionHandler} from '../../../../../lesson-entries/display-entries/questions-entry/classes/questionHandler';

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
