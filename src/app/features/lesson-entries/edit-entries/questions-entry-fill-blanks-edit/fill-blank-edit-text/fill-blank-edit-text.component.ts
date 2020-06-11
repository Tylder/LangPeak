import {Component, Input, OnInit} from '@angular/core';
import {FillBlankTextQuestion} from '../../../display-entries/questions-entry/models/questionDataTypes';
import {QuestionFillBlanksEditService, QuestionWord} from '../services/question-fill-blanks-edit.service';

@Component({
  selector: 'app-fill-blank-edit-text',
  templateUrl: './fill-blank-edit-text.component.html',
  styleUrls: ['./fill-blank-edit-text.component.scss']
})
export class FillBlankEditTextComponent implements OnInit {

  @Input() question: FillBlankTextQuestion;
  @Input() questionWords: QuestionWord[];

  constructor(public fillBlanksEditService: QuestionFillBlanksEditService) { }

  ngOnInit(): void {

  }

  selectWordAndQuestion(word: QuestionWord) {

    const prevSelectedWords = this.fillBlanksEditService.selectedWords$.getValue();

    if (prevSelectedWords[0] != null && prevSelectedWords[0] === word) {
      this.fillBlanksEditService.selectedWords$.next([]);
      this.fillBlanksEditService.selectedQuestion$.next(null);
    } else {

      this.fillBlanksEditService.selectQuestion(this.question);
      this.fillBlanksEditService.toggleSelectWord(word);
    }




    // const isHasBlankSelected = this.fillBlanksEditService.selectedWords$.getValue().findIndex(w => w.isBlank) !== -1;
    //
    // if (word.isBlank || isHasBlankSelected) { // reset
    //   this.fillBlanksEditService.selectedWords$.next([]);
    // }


    // word.isSelected = true;
    // this.fillBlanksEditService.selectedWord$.next(word);
  }
}
