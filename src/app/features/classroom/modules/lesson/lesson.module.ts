import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LessonRoutingModule} from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import {LessonService} from './services/db/lesson.service';
import {SharedModule} from '../../../../shared/shared.module';
import { EntryContentDirective } from './modules/shared-entry/directives/entry-content.directive';
import { BaseEntryComponent } from './modules/shared-entry/components/base-entry/base-entry.component';
import {QuestionsEntryModule} from './modules/questions-entry/questions-entry.module';


@NgModule({
  declarations: [
    LessonComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    QuestionsEntryModule,
    SharedModule,
  ],
  providers: [
    LessonService,

  ],
  exports: [
  ]
})
export class LessonModule { }
