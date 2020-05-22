import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FillBlanksGroupComponent} from './modules/questions-entry/question-group-types/fill-blanks/components/fill-blanks-group/fill-blanks-group.component';
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
