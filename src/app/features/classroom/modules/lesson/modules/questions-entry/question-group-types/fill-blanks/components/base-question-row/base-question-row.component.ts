import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../../../../models/question';
import {QuestionGroup} from '../../../../models/questionGroup';
import {FillBlankTextQuestion} from '../../../../models/questionDataTypes';

@Component({
  selector: 'app-base-question-row',
  template: ``
})
export class BaseQuestionRowComponent implements OnInit {

  @Input() question: Question | QuestionGroup;

  questions: {
    question: Question,
    data: FillBlankTextQuestion
  }[] = [];

  constructor() { }

  ngOnInit(): void {

    if (this.question instanceof QuestionGroup) {
      this.question.getQuestionsAndGroups()
        .filter(question => question instanceof Question) // we only get the one level down questions-entry, there shouldn't be any groups
        .forEach(question => {
          question = question as Question;
          this.questions.push({
            question,
            data: question.data as FillBlankTextQuestion
          });
        });
    }
    else {
      this.questions.push({
        question: this.question,
        data: this.question.data as FillBlankTextQuestion
      });
    }
  }

}
