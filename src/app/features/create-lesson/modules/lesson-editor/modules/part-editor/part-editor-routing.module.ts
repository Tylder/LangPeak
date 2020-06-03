import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PartEditorComponent} from './part-editor.component';

const routes: Routes = [

  { path: '',
    component: PartEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartEditorRoutingModule { }
