import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {SharedEntryModule} from '../../shared-entry/shared-entry.module';
import {QuestionGroupEntryFillBlanksEditComponent} from './question-group-entry-fill-blanks-edit.component';




@NgModule({
  declarations: [
    QuestionGroupEntryFillBlanksEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedEntryModule,
  ],
  providers: [

  ],
  exports: [

  ]
})
export class QuestionsEntryEditModule { }
