import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FillBlankTextQuestion} from '../../../display-entries/questions-entry/models/questionDataTypes';
import {QuestionFillBlanksEditService, QuestionWord} from '../services/question-fill-blanks-edit.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-fill-blank-row-edit',
  templateUrl: './fill-blank-row-edit.component.html',
  styleUrls: ['./fill-blank-row-edit.component.scss']
})
export class FillBlankRowEditComponent implements OnInit, OnChanges {

  @Input() question: FillBlankTextQuestion;
  questionWords: QuestionWord[];

  isEdit: boolean;

  // questions: FillBlankTextQuestion[] = [];

  constructor(public fillBlanksEditService: QuestionFillBlanksEditService) { }

  ngOnInit(): void {


    // this.questionWords = this.fillBlanksEditService.splitQuestionIntoWords(this.question);
    this.fillBlanksEditService.selectedQuestion$.pipe(
      map(editQuestion => editQuestion === this.question),
    ).subscribe(isEdit => this.isEdit = isEdit);
    // if ('questions' in this.question) {
    //   this.questions = this.question.questions;
    // } else {
    //   this.questions.push(this.question);
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.questionWords = this.fillBlanksEditService.splitQuestionIntoWords(this.question);
  }


}
