import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FillBlanksGroupComponent} from './components/fill-blanks/fill-blanks-group.component';
import {LessonComponent} from './lesson.component';


const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: ':id', component: LessonComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
