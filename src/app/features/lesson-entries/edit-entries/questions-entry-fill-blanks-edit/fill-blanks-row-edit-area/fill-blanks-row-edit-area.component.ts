import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LessonPartEntry, QuestionData} from '../../../../../shared/models/lesson';
import {FillBlankTextQuestion} from '../../../display-entries/questions-entry/models/questionDataTypes';
import {QuestionFillBlanksEditService, QuestionWord} from '../services/question-fill-blanks-edit.service';
import {distinctUntilChanged, map, mergeMap, tap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';


@Component({
  selector: 'app-fill-blanks-row-edit-area',
  templateUrl: './fill-blanks-row-edit-area.component.html',
  styleUrls: ['./fill-blanks-row-edit-area.component.scss']
})
export class FillBlanksRowEditAreaComponent implements OnInit, OnDestroy {

  @Input() question: FillBlankTextQuestion;
  @Input() questionWords: QuestionWord[];

  // question: FillBlankTextQuestion;
  // questionWords: QuestionWord[];

  constructor(public fillBlanksEditService: QuestionFillBlanksEditService) {

    // this.fillBlanksEditService.getQuestionFromSelectedWord$()
    //   .subscribe((question) => {
    //     this.questionWords = this.fillBlanksEditService.splitQuestionIntoWords(question);
    //   });

  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log('DESTROY');
  }


  isHasBlanks() {
    if (this.questionWords != null) {
      return this.questionWords.filter(word => word.isBlank).length > 0;
    } else {
      return false;
    }
  }

  createFillBlanks() {
    console.log(this.questionWords);
    const questions = this.fillBlanksEditService.getFillBlanksFromQuestionWords(this.questionWords);

    console.log(questions, this.questionWords);

    if (questions.length > 1) {
      this.fillBlanksEditService.addQuestionsToQuestion$(this.question, questions).subscribe(val => console.log(val));
    } else {
      this.fillBlanksEditService.updateQuestion$({...this.question, ...questions[0]}).subscribe();
    }
  }

}
