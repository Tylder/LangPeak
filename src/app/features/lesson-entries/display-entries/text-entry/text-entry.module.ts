import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {SharedEntryModule} from '../../shared-entry/shared-entry.module';
import { TextEntryComponent } from './text-entry.component';



@NgModule({
  declarations: [TextEntryComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedEntryModule
  ]
})
export class TextEntryModule { }
