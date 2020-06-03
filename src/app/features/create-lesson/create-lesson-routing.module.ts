import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateLessonComponent} from './create-lesson.component';
import {LessonEditorComponent} from './modules/lesson-editor/lesson-editor.component';
import {CreateLessonHomeComponent} from './components/create-lesson-home/create-lesson-home.component';
import {NavigatorSideBarLoaderComponent} from '../../shared/components/navigator-side-bar-loader/navigator-side-bar-loader.component';
import {SidebarPartListComponent} from './modules/lesson-editor/components/part-editor-left-sidebar/side-bar-part-list/sidebar-part-list.component';
import {LessonInfoEditorComponent} from './modules/lesson-editor/components/lesson-info-editor/lesson-info-editor.component';
import {PartEditorComponent} from './modules/lesson-editor/modules/part-editor/part-editor.component';
import {LessonResolverService} from '../../shared/services/lesson-resolver.service';
import {LessonEditorRoutingModule} from './modules/lesson-editor/lesson-editor-routing.module';


const routes: Routes = [
  { path: '', component: CreateLessonComponent, children: [
      {path: '', component: CreateLessonHomeComponent },
      { path: 'edit', loadChildren: () => import('./modules/lesson-editor/lesson-editor.module').then(m => m.LessonEditorModule) },
      // { path: 'edit', children: LessonEditorRoutingModule. },
  ]},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateLessonRoutingModule { }
