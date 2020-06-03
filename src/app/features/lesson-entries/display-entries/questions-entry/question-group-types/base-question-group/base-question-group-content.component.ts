import {Component, Input, OnInit, Type} from '@angular/core';
import {LessonPartEntry, QuestionData} from '../../../../../../shared/models/lesson';
import {QuestionGroup} from '../../models/questionGroup';
import {QuestionHandler} from '../../classes/questionHandler';
import {UtilsService} from '../../../../../../shared/services/utils.service';
import {ValidatorFn} from '@angular/forms';
import {correctValueValidator} from '../../models/question';
import {QuestionService} from '../../../../../classroom/modules/lesson/services/state/question.service';
import {DynamicContentComponent} from '../../../../../../shared/mixins/load-dynamic-entry';

export class QuestionGroupItem {
  constructor(public component: Type<any>,
              public questionHandler: QuestionHandler) {}
}


@Component({
  selector: 'app-base-question-group',
  template: `<p> base Questions group content works! </p>`,
})
export class BaseQuestionGroupContentComponent implements DynamicContentComponent {

  @Input() data: {questionHandler: QuestionHandler};

  constructor() {}

}
