import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseEntryComponent} from './components/base-entry/base-entry.component';
import {SharedModule} from '../../../shared/shared.module';
import {QuillEditAndViewModule} from './quill-lesson-editor/quill-edit-and-view.module';
import {QuestionIndexComponent} from './components/question-index/question-index.component';
import {BaseIndexComponent} from './components/base-index/base-index.component';



@NgModule({
  declarations: [
    BaseEntryComponent,
    QuestionIndexComponent,
    BaseIndexComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuillEditAndViewModule
  ],
  exports: [
    BaseEntryComponent,
    BaseIndexComponent,
    QuestionIndexComponent,
    QuillEditAndViewModule,
  ]
})
export class SharedEntryModule { }
