import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {SharedEntryModule} from '../../shared-entry/shared-entry.module';
import { TextEntryEditComponent } from './text-entry-edit.component';



@NgModule({
  declarations: [TextEntryEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedEntryModule
  ]
})
export class TextEntryEditModule { }
