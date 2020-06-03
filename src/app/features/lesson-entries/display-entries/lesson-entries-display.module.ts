import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionsEntryModule} from './questions-entry/questions-entry.module';
import {TextEntryModule} from './text-entry/text-entry.module';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionsEntryModule,
    TextEntryModule,
  ],
  exports: []
})
export class LessonEntriesDisplayModule { }
