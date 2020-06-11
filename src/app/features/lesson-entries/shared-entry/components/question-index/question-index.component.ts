import {Component, Input, OnInit} from '@angular/core';
import {QuestionGroup} from '../../../display-entries/questions-entry/models/questionGroup';
import {Question} from '../../../display-entries/questions-entry/models/question';

@Component({
  selector: 'app-question-index',
  templateUrl: './question-index.component.html',
  styleUrls: ['./question-index.component.scss']
})
export class QuestionIndexComponent implements OnInit {

  @Input() question: Question | QuestionGroup;
  @Input() questionGroup: QuestionGroup;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
    if (this.question instanceof Question) { this.question = this.question as Question; }
    if (this.question instanceof QuestionGroup) { this.question = this.question as QuestionGroup; }
  }

  delete() {
    this.questionGroup.removeControl(this.question.data.id);
  }

  fillCorrectValue() {
    if (this.question instanceof Question) {
      this.question = this.question as Question;
      this.question.fillCorrectValue();
    }
    if (this.question instanceof QuestionGroup) {
      this.question = this.question as QuestionGroup;
      this.question.fillCorrectValuesDeep();
    }
  }

  reset() {
    this.question.reset();
  }

}
