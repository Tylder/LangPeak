import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../../shared/shared.module';
import {SharedEntryModule} from '../../shared-entry/shared-entry.module';
import {QuestionGroupEntryFillBlanksEditComponent} from './question-group-entry-fill-blanks-edit.component';
import { FillBlanksRowEditAreaComponent } from './fill-blanks-row-edit-area/fill-blanks-row-edit-area.component';
import {QuestionFillBlanksEditService} from './services/question-fill-blanks-edit.service';
import {DragToSelectModule} from 'ngx-drag-to-select';
import { FillBlankRowEditComponent } from './fill-blank-row-edit/fill-blank-row-edit.component';
import { FillBlankEditTextComponent } from './fill-blank-edit-text/fill-blank-edit-text.component';
import { FillBlankAddAltComponent } from './fill-blank-add-alt/fill-blank-add-alt.component';




@NgModule({
  declarations: [
    QuestionGroupEntryFillBlanksEditComponent,
    FillBlanksRowEditAreaComponent,
    FillBlankRowEditComponent,
    FillBlankEditTextComponent,
    FillBlankAddAltComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedEntryModule,
    DragToSelectModule.forRoot()
  ],
  providers: [],
  exports: [

  ]
})
export class QuestionsEntryFillBlanksEditModule { }
