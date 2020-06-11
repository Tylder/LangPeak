import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TextEntryEditModule} from './text-entry-edit/text-entry-edit.module';
import {SharedModule} from '../../../shared/shared.module';
import {QuestionsEntryFillBlanksEditModule} from './questions-entry-fill-blanks-edit/questions-entry-fill-blanks-edit.module';
import {QuillModule} from 'ngx-quill';
import {QuillEditAndViewModule} from '../shared-entry/quill-lesson-editor/quill-edit-and-view.module';
import {DragToSelectModule} from 'ngx-drag-to-select';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    TextEntryEditModule,
    QuestionsEntryFillBlanksEditModule,
  ],
  exports: []
})
export class LessonEntriesEditModule { }
