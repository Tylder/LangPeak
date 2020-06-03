import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateLessonComponent } from './create-lesson.component';
import {CreateLessonRoutingModule} from './create-lesson-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';
import { CreateLessonHomeComponent } from './components/create-lesson-home/create-lesson-home.component';
import { CreateLessonSideBarComponent } from './components/create-lesson-home/create-lesson-side-bar/create-lesson-side-bar.component';
import {LessonEditorModule} from './modules/lesson-editor/lesson-editor.module';



@NgModule({
  declarations: [
    CreateLessonComponent,
    LessonListComponent,
    CreateLessonHomeComponent,
    CreateLessonSideBarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CreateLessonRoutingModule,
    LessonEditorModule,
  ]
})
export class CreateLessonModule { }
