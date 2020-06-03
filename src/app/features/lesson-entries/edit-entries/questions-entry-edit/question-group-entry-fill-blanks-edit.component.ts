import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {Lesson, LessonPartEntry, QuestionData} from '../../../../shared/models/lesson';

import {ValidatorFn} from '@angular/forms';

import {UtilsService} from '../../../../shared/services/utils.service';
import {QuestionService} from '../../../classroom/modules/lesson/services/state/question.service';

import {QuestionGroup} from '../../display-entries/questions-entry/models/questionGroup';

interface QuestionContentComponentMapping {
  /**
   * Mapping of Content Components, ex. {'fill-blank': FillBlanksGroupComponent}
   */
  [key: string]: Type<any>;
}

@Component({
  selector: 'app-question-group-entry-fill-blanks-edit',
  templateUrl: './question-group-entry-fill-blanks-edit.component.html',
  styleUrls: ['./question-group-entry-fill-blanks-edit.component.scss']
})

export class QuestionGroupEntryFillBlanksEditComponent  implements OnInit {

  /// TODO this should extend a base entry class

  @Input() data: LessonPartEntry;
  @Input() startShowAmount = 5;
  // @ViewChild(DynamicContentDirective, {static: true}) dynamicContentHost: DynamicContentDirective;

  questions: QuestionGroup;
  // questionHandler: QuestionHandler;
  // questionValidators: ValidatorFn | ValidatorFn[] | null = [correctValueValidator];
  // contentComponentMapping: QuestionContentComponentMapping = {};
  // currentContentComponentKeyIndex: number;

  entry: LessonPartEntry;
  // dynamicContentItem: DynamicContentItem;

  constructor(private utilsService: UtilsService,
              private questionService: QuestionService) {
  }

  ngOnInit(): void {

    this.entry = this.data; // just for clarity
  }

}
