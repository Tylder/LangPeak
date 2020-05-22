import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntryContentDirective} from './directives/entry-content.directive';
import {BaseEntryComponent} from './components/base-entry/base-entry.component';



@NgModule({
  declarations: [
    EntryContentDirective,
    BaseEntryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntryContentDirective,
    BaseEntryComponent
  ]
})
export class SharedEntryModule { }
