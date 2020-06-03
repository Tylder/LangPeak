import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PartEditorLeftSidebarComponent} from './components/part-editor-left-sidebar/part-editor-left-sidebar.component';
import {PartEditorRightSideBarComponent} from './components/part-editor-right-side-bar/part-editor-right-side-bar.component';
import {SidebarPartListComponent} from './components/part-editor-left-sidebar/side-bar-part-list/sidebar-part-list.component';
import {SharedModule} from '../../../../shared/shared.module';
import {LessonInfoEditorComponent} from './components/lesson-info-editor/lesson-info-editor.component';
import {LessonEntriesDisplayModule} from '../../../lesson-entries/display-entries/lesson-entries-display.module';
import {LessonEditorRoutingModule} from './lesson-editor-routing.module';
import {LessonEditorComponent} from './lesson-editor.component';
import {PartEditorModule} from './modules/part-editor/part-editor.module';



@NgModule({
  declarations: [
    LessonEditorComponent,
    PartEditorLeftSidebarComponent,
    PartEditorRightSideBarComponent,
    SidebarPartListComponent,
    LessonInfoEditorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LessonEditorRoutingModule,
    LessonEntriesDisplayModule,
    PartEditorModule,
  ]
})
export class LessonEditorModule { }
