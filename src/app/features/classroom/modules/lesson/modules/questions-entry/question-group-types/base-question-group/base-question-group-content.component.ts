import {Component, Input, OnInit, Type} from '@angular/core';
import {LessonPartEntryData, QuestionData} from '../../../../models/db/lesson';
import {QuestionGroup} from '../../models/questionGroup';
import {QuestionHandler} from '../../classes/questionHandler';
import {UtilsService} from '../../../../../../../../shared/services/utils.service';
import {ValidatorFn} from '@angular/forms';
import {correctValueValidator} from '../../models/question';
import {QuestionService} from '../../../../services/state/question.service';
import {ContentComponent} from '../../../shared-entry/components/base-entry/base-entry.component';

export class QuestionGroupItem {
  constructor(public component: Type<any>,
              public questionHandler: QuestionHandler) {}
}


@Component({
  selector: 'app-base-question-group',
  template: `<p> base Questions group content works! </p>`,
})
export class BaseQuestionGroupContentComponent implements ContentComponent {

  @Input() data: {questionHandler: QuestionHandler};

  constructor() {}

}
