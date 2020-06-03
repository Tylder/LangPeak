import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PartEditorComponent} from './part-editor.component';
import {SharedModule} from '../../../../../../shared/shared.module';
import {PartEditorRoutingModule} from './part-editor-routing.module';
import {LessonEntriesEditModule} from '../../../../../lesson-entries/edit-entries/lesson-entries-edit.module';
import {EntryEditLoaderComponent} from './components/entry-edit-loader/entry-edit-loader.component';



@NgModule({
  declarations: [
    PartEditorComponent,
    EntryEditLoaderComponent,
  ],
  imports: [
    CommonModule,
    PartEditorRoutingModule,
    SharedModule,
    LessonEntriesEditModule,
  ]
})
export class PartEditorModule { }
