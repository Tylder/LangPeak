import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseEntryComponent} from './components/base-entry/base-entry.component';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    BaseEntryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BaseEntryComponent
  ]
})
export class SharedEntryModule { }
