import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {Lesson, LessonPartEntry, QuestionData} from '../../../../shared/models/lesson';

import {FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

import {UtilsService} from '../../../../shared/services/utils.service';
import {QuestionService} from '../../../classroom/modules/lesson/services/state/question.service';

import {QuestionGroup} from '../../display-entries/questions-entry/models/questionGroup';
import {Lesson2Service} from '../../../../shared/services/lesson2.service';
import {QuestionFillBlanksEditService} from './services/question-fill-blanks-edit.service';
import {FillBlankTextQuestion} from '../../display-entries/questions-entry/models/questionDataTypes';

interface QuestionContentComponentMapping {
  /**
   * Mapping of Content Components, ex. {'fill-blank': FillBlanksGroupComponent}
   */
  [key: string]: Type<any>;
}

@Component({
  selector: 'app-question-group-entry-fill-blanks-edit',
  templateUrl: './question-group-entry-fill-blanks-edit.component.html',
  styleUrls: ['./question-group-entry-fill-blanks-edit.component.scss'],
  providers: [QuestionFillBlanksEditService]
})

export class QuestionGroupEntryFillBlanksEditComponent  implements OnInit {

  /// TODO this should extend a base entry class

  @Input() data: LessonPartEntry;
  @Input() startShowAmount = 5;
  // @ViewChild(DynamicContentDirective, {static: true}) dynamicContentHost: DynamicContentDirective;

  isShowAddQuestionInput = false;

  addQuestionFullTextForm: FormGroup;

  questions: QuestionGroup;
  // questionHandler: QuestionHandler;
  // questionValidators: ValidatorFn | ValidatorFn[] | null = [correctValueValidator];
  // contentComponentMapping: QuestionContentComponentMapping = {};
  // currentContentComponentKeyIndex: number;

  // dynamicContentItem: DynamicContentItem;

  constructor(private lesson2Service: Lesson2Service,
              public fillBlanksEditService: QuestionFillBlanksEditService,
              private fb: FormBuilder) {
    this.addQuestionFullTextForm = this.fb.group({
      fullText: ['', Validators.required]
    });

    this.addQuestionFullTextForm.valueChanges.subscribe(val => console.log(val));
  }

  ngOnInit(): void {

    this.fillBlanksEditService.startPartEntryListener(this.data);
  }

  trackEntries(index: number, entry: QuestionData) {
    return entry.id;
  }

  showAddQuestionFullTextInput() {
    this.isShowAddQuestionInput = true;
    this.fillBlanksEditService.selectedQuestion$.next(null);
  }

  addQuestion() {
    /**
     * creates a new entry and shows a field to enter the full text attribute
     */

    if (this.addQuestionFullTextForm.invalid) { return; }

    const question: FillBlankTextQuestion = {
      ...this.addQuestionFullTextForm.value,
      index: this.fillBlanksEditService.questions$.getValue().length
    };

    this.fillBlanksEditService.addQuestionToEntry$(question).subscribe(() => {
      this.isShowAddQuestionInput = false;
      this.addQuestionFullTextForm.reset();
    });


    // this.lesson2Service.add
    // const question: QuestionData = {
    //
    // }
  }
  deleteQuestion(question: QuestionData) {
    this.lesson2Service.deleteDocByPath(question.path).subscribe();
  }

  cancelAddQuestion() {
    this.isShowAddQuestionInput = false;
    this.addQuestionFullTextForm.reset();
  }

}
