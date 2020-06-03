import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextEntryEditModule} from './text-entry-edit/text-entry-edit.module';
import {SharedModule} from '../../../shared/shared.module';
import {QuestionsEntryEditModule} from './questions-entry-edit/questions-entry-edit.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    TextEntryEditModule,
    QuestionsEntryEditModule
  ],
  exports: []
})
export class LessonEntriesEditModule { }
