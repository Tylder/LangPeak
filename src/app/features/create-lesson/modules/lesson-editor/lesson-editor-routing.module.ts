import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LessonInfoEditorComponent} from './components/lesson-info-editor/lesson-info-editor.component';
import {PartEditorComponent} from './modules/part-editor/part-editor.component';
import {LessonExistsGuard} from './guards/lesson-exists.guard';
import {LessonEditorComponent} from './lesson-editor.component';
import {LessonPartExistsGuard} from './guards/lesson-part-exists.guard';


const routes: Routes = [

  { path: ':lessonId',
    component: LessonEditorComponent,
    canActivate: [LessonExistsGuard],
    children: [
    {
      path: '',
      component: LessonInfoEditorComponent,
      // canActivate: [LessonExistsGuard],
    },
    {
      path: ':partId',
      loadChildren: () => import('./modules/part-editor/part-editor.module').then(m => m.PartEditorModule)
      // canActivate: [LessonPartExistsGuard],
    },
  ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonEditorRoutingModule { }
