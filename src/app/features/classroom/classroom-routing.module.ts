import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestComponent} from './components/test/test.component';
import {ClassroomComponent} from './classroom.component';


const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: ClassroomComponent, children: [
    { path: 'lesson', loadChildren: () => import('./modules/lesson/lesson.module').then(m => m.LessonModule) },
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule { }
