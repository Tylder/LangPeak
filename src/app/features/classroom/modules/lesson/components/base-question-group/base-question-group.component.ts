import {Component, Input, OnInit} from '@angular/core';
import {LessonPartEntryData, QuestionData} from '../../models/db/lesson';
import {QuestionGroup} from '../../models/lesson/questionGroup';
import {QuestionHandler} from '../../classes/QuestionHandler';
import {UtilsService} from '../../../../../../shared/services/utils.service';
import {ValidatorFn} from '@angular/forms';
import {correctValueValidator} from '../../models/lesson/question';
import {QuestionService} from '../../services/state/question.service';

@Component({
  selector: 'app-base-question-group',
  template: `
    <p>
      base Questions group works!
    </p>
  `,
})
export class BaseQuestionGroupComponent implements OnInit {

  @Input() questionsData: QuestionData[];
  @Input() startShowAmount = 5;

  questions: QuestionGroup;
  questionHandler: QuestionHandler;
  questionValidators: ValidatorFn | ValidatorFn[] | null = [correctValueValidator];

  constructor(private utilsService: UtilsService,
              private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionHandler = new QuestionHandler(
      this.utilsService,
      this.questionsData,
      this.startShowAmount,
      this.questionValidators
    );

    this.questions = this.questionHandler.questionGroup;

  }

  addQuestion() {
    const pickedQuestion = this.questionHandler.pickQuestions(1)[0];
    this.questionHandler.addQuestion(pickedQuestion.id);
  }

}
