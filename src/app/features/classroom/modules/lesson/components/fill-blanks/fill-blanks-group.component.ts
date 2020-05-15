import {Component, Input, OnInit} from '@angular/core';
import {LessonService} from '../../services/db/lesson.service';
import {LessonPartEntryData} from '../../models/db/lesson';
import {QuestionGroup} from '../../models/lesson/questionGroup';
import {Validators} from '@angular/forms';
import {correctValueValidator} from '../../models/lesson/question';
import {BaseQuestionGroupComponent} from '../base-question-group/base-question-group.component';
import {UtilsService} from '../../../../../../shared/services/utils.service';
import {QuestionService} from '../../services/state/question.service';

@Component({
  selector: 'app-fill-blanks-group',
  templateUrl: './fill-blanks-group.component.html',
  styleUrls: ['./fill-blanks-group.component.scss']
})
export class FillBlanksGroupComponent extends BaseQuestionGroupComponent implements OnInit {

  constructor(private lessonService: LessonService,
              questionService: QuestionService,
              utilsService: UtilsService) {
    super(utilsService, questionService);
  }

  ngOnInit(): void {

    super.ngOnInit(); // creates the question Handler

    this.questions.valueChanges.subscribe(value => console.log(value));

    this.questions.statusChanges.subscribe(value => {
      console.log(this.questions);
    });
  }



}
