import {Component, Input, OnInit} from '@angular/core';
import {FillBlankTextQuestion} from '../../../display-entries/questions-entry/models/questionDataTypes';
import {QuestionFillBlanksEditService, QuestionWord} from '../services/question-fill-blanks-edit.service';
import {mergeMap, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-fill-blank-add-alt',
  templateUrl: './fill-blank-add-alt.component.html',
  styleUrls: ['./fill-blank-add-alt.component.scss']
})
export class FillBlankAddAltComponent implements OnInit {

  question: FillBlankTextQuestion;

  addAlternativeForm: FormGroup;
  addCorrectForm: FormGroup;

  constructor(private fillBlanksEditService: QuestionFillBlanksEditService,
              private fb: FormBuilder) {

    this.fillBlanksEditService.selectedWords$.pipe(
      tap(words => console.log(words)),
      mergeMap(words => {
        if (words.length <= 0) { return throwError('No selected words'); }
        else { return this.fillBlanksEditService.getQuestionFromWord$(words[0]); }
      }) // only one word selected if its a blank
    ).subscribe(question => this.question = question);

    this.addAlternativeForm = this.fb.group({
      alternative: ['', Validators.required]
    });

    this.addCorrectForm = this.fb.group({
      correctValue: ['', Validators.required]
    });

  }

  addAlt() {

    if (this.addAlternativeForm.invalid) { return; }

    const alt = this.addAlternativeForm.controls.alternative.value;

    if (this.question.correctValues.includes(alt)) { return; }  // TODO should be included in the validation

    this.fillBlanksEditService.addAltToQuestion$(this.question, alt).subscribe(() => {
      this.addAlternativeForm.reset();
    });
  }

  addCorrectValue() {

    if (this.addCorrectForm.invalid) { return; }

    const correctValue = this.addCorrectForm.controls.correctValue.value;

    if ('alternatives' in this.question && this.question.alternatives.includes(correctValue)) { return; }
    // TODO should be included in the validation

    this.fillBlanksEditService.addCorrectValueToQuestion$(this.question, correctValue).subscribe(() => {
      this.addCorrectForm.reset();
    });
  }

  removeAlt(alt: string) {
    this.fillBlanksEditService.removeAltFromQuestion$(this.question, alt).subscribe();
  }

  removeCorrect(correctValue: string) {

    if (this.question.correctValues.length === 1) { return; } // cant remove the last one

    this.fillBlanksEditService.removeCorrectValueFromQuestion$(this.question, correctValue).subscribe();
  }

  ngOnInit(): void {
  }

  removeBlank() {
    // this.fillBlanksEditService.
  }

}
