import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FillBlankTextQuestion} from '../../../../models/db/questionDataTypes';
import {QuestionData} from '../../../../models/db/lesson';
import {Question} from '../../../../models/lesson/question';
import {QuestionGroup} from '../../../../models/lesson/questionGroup';

@Component({
  selector: 'app-fill-blanks-row',
  templateUrl: './fill-blanks-row.component.html',
  styleUrls: ['./fill-blanks-row.component.scss']
})
export class FillBlanksRowComponent implements OnInit {

  @Input() question: Question | QuestionGroup;

  questions: {
    question: Question,
    data: FillBlankTextQuestion
  }[] = [];

  constructor() { }

  ngOnInit(): void {

    console.log(this.question);

    if (this.question instanceof QuestionGroup) {
      this.question.getQuestionsAndGroups()
        .filter(question => question instanceof Question) // we only get the one level down questions, there shouldn't be any groups
        .forEach(question => {
          question = question as Question;
          this.questions.push({
            question,
            data: question.data as FillBlankTextQuestion
          });
      });
    }
    else {
      this.questions.push({
        question: this.question,
        data: this.question.data as FillBlankTextQuestion
      });
    }

    console.log(this.questions);

    // if (this.question instanceof Question) {
    //   // only one question
    //
    //
    // }
    // else {
    //   // multiple questions in a QuestionGroup
    //
    // }

    // const tempQuestionsCopy = Object.assign<QuestionData[], QuestionData[]>([], this.data.questions);
    //
    // this.data.textParts.forEach(part => {
    //   if (part !== false) { this.textPartsReconstructed.push(part as string); }
    //   else {
    //     const question: QuestionData = tempQuestionsCopy.splice(0, 1)[0];
    //     this.textPartsReconstructed.push(question);
    //   }
    // });
  }

  // handleResults(results: FillBlankResult) {
  //   console.log(results);
  // }

}
