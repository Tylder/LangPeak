import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FillBlanksGroupComponent} from './components/fill-blanks/fill-blanks-group.component';
import {LessonRoutingModule} from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import {LessonService} from './services/db/lesson.service';
import {SharedModule} from '../../../../shared/shared.module';
import {InputBlankTextDirective} from './components/fill-blanks/directives/input-blank-text.directive';
import {FillBlanksRowComponent} from './components/fill-blanks/components/fill-blanks-row/fill-blanks-row.component';
import {FillBlankTextComponent} from './components/fill-blanks/components/fill-blank-text/fill-blank-text.component';
import {BaseFillBlankComponent} from './components/fill-blanks/components/base-fill-blank/base-fill-blank.component';
import {FillBlankValidComponent} from './components/fill-blanks/components/fill-blank-valid/fill-blank-valid.component';
import { BaseQuestionGroupComponent } from './components/base-question-group/base-question-group.component';
import {QuestionService} from './services/state/question.service';
import { QuestionIndexComponent } from './components/question-index/question-index.component';
import { QuestionGroupContainerComponent } from './components/question-group-container/question-group-container.component';
import { EntryContentDirective } from './directives/entry-content.directive';
import { BaseEntryComponent } from './components/base-entry/base-entry.component';
import {QuestionsModule} from './questions/questions.module';


@NgModule({
  declarations: [
    BaseQuestionGroupComponent,
    FillBlanksGroupComponent,
    LessonComponent,
    InputBlankTextDirective,
    FillBlanksRowComponent,
    FillBlankTextComponent,
    BaseFillBlankComponent,
    FillBlankValidComponent,
    QuestionIndexComponent,
    QuestionGroupContainerComponent,
    EntryContentDirective,
    BaseEntryComponent,

  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    QuestionsModule,
    SharedModule
  ],
  providers: [
    LessonService,
    QuestionService
  ]
})
export class LessonModule { }
