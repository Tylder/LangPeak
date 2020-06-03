import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LessonRoutingModule} from './lesson-routing.module';
import { LessonComponent } from './lesson.component';
import {SharedModule} from '../../../../shared/shared.module';
import {LessonEntriesDisplayModule} from '../../../lesson-entries/display-entries/lesson-entries-display.module';
import {PartEntryComponent} from './components/part-entry/part-entry.component';


@NgModule({
  declarations: [
    LessonComponent,
    PartEntryComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,

    LessonEntriesDisplayModule,
    SharedModule,
  ],
  providers: [
  ],
  exports: [
  ]
})
export class LessonModule { }
