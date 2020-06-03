import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseQuestionGroupContentComponent} from './question-group-types/base-question-group/base-question-group-content.component';
import {FillBlanksGroupComponent} from './question-group-types/fill-blanks/components/fill-blanks-group/fill-blanks-group.component';
import {InputBlankTextDirective} from './question-group-types/fill-blanks/directives/input-blank-text.directive';
import {FillBlanksRowComponent} from './question-group-types/fill-blanks/components/fill-blanks-row/fill-blanks-row.component';
import {FillBlankTextComponent} from './question-group-types/fill-blanks/components/fill-blank-text/fill-blank-text.component';
import {BaseFillBlankComponent} from './question-group-types/fill-blanks/components/base-fill-blank/base-fill-blank.component';
import {FillBlankValidComponent} from './question-group-types/fill-blanks/components/fill-blank-valid/fill-blank-valid.component';
import {QuestionIndexComponent} from './components/question-index/question-index.component';
import {QuestionGroupEntryFillBlanksComponent} from './question-group-entry-fill-blanks.component';
import {QuestionService} from '../../../classroom/modules/lesson/services/state/question.service';
import {SharedModule} from '../../../../shared/shared.module';
import {LessonModule} from '../../../classroom/modules/lesson/lesson.module';
import {SharedEntryModule} from '../../shared-entry/shared-entry.module';
import { DropDownBlanksGroupComponent } from './question-group-types/fill-blanks/components/drop-down-blanks-group/drop-down-blanks-group.component';
import { DropDownBlanksRowComponent } from './question-group-types/fill-blanks/components/drop-down-blanks-row/drop-down-blanks-row.component';
import { BaseQuestionRowComponent } from './question-group-types/fill-blanks/components/base-question-row/base-question-row.component';
import { DropDownBlanksInputComponent } from './question-group-types/fill-blanks/components/drop-down-blanks-input/drop-down-blanks-input.component';
import { DragDropBlanksGroupComponent } from './question-group-types/fill-blanks/components/drag-drop-blanks-group/drag-drop-blanks-group.component';
import { AddSetQuestionsComponent } from './components/add-set-questions/add-set-questions.component';
import { DragDropBlanksRowComponent } from './question-group-types/fill-blanks/components/drag-drop-blanks-row/drag-drop-blanks-row.component';
import { DragDropBlanksInputComponent } from './question-group-types/fill-blanks/components/drag-drop-blanks-input/drag-drop-blanks-input.component';



@NgModule({
  declarations: [
    BaseQuestionGroupContentComponent,
    FillBlanksGroupComponent,
    InputBlankTextDirective,
    FillBlanksRowComponent,
    FillBlankTextComponent,
    BaseFillBlankComponent,
    FillBlankValidComponent,
    QuestionIndexComponent,
    QuestionGroupEntryFillBlanksComponent,
    DropDownBlanksGroupComponent,
    DropDownBlanksRowComponent,
    BaseQuestionRowComponent,
    DropDownBlanksInputComponent,
    DragDropBlanksGroupComponent,
    AddSetQuestionsComponent,
    DragDropBlanksRowComponent,
    DragDropBlanksInputComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedEntryModule,
  ],
  providers: [
    QuestionService
  ],
  exports: [
    QuestionGroupEntryFillBlanksComponent
  ]
})
export class QuestionsEntryModule { }
