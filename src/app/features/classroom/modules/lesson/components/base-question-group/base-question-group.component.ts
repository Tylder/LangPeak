import {Component, Input, OnInit} from '@angular/core';
import {LessonPartEntryData, QuestionData} from '../../models/db/lesson';
import {QuestionGroup} from '../../models/lesson/questionGroup';
import {QuestionHandler} from '../../classes/QuestionHandler';
import {UtilsService} from '../../../../../../shared/services/utils.service';
import {ValidatorFn} from '@angular/forms';
import {correctValueValidator} from '../../models/lesson/question';
import {QuestionService} from '../../services/state/question.service';

@Component({
  selector: 'app-base-question-group',
  template: `
    <p>
      base Questions group works!
    </p>
  `,
})
export class BaseQuestionGroupComponent {

  @Input() questionHandler: QuestionHandler;

  constructor() {}

}
