import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {Lesson, LessonPartEntry, QuestionData} from '../../../../shared/models/lesson';
import {QuestionGroup} from './models/questionGroup';
import {QuestionHandler} from './classes/questionHandler';
import {ValidatorFn} from '@angular/forms';
import {correctValueValidator} from './models/question';
import {UtilsService} from '../../../../shared/services/utils.service';
import {QuestionService} from '../../../classroom/modules/lesson/services/state/question.service';
import {FillBlanksGroupComponent} from './question-group-types/fill-blanks/components/fill-blanks-group/fill-blanks-group.component';
import {DropDownBlanksGroupComponent} from './question-group-types/fill-blanks/components/drop-down-blanks-group/drop-down-blanks-group.component';
import {DragDropBlanksGroupComponent} from './question-group-types/fill-blanks/components/drag-drop-blanks-group/drag-drop-blanks-group.component';
import {DynamicContentComponent, DynamicContentItem, mixinLoadDynamicEntry} from '../../../../shared/mixins/load-dynamic-entry';
import {Lesson2Service} from '../../../../shared/services/lesson2.service';
import {tap} from 'rxjs/operators';

class QuestionGroupBase {}



interface QuestionContentComponentMapping {
  /**
   * Mapping of Content Components, ex. {'fill-blank': FillBlanksGroupComponent}
   */
  [key: string]: Type<any>;
}


class BaseClass {
  constructor(public componentFactoryResolver: ComponentFactoryResolver) {
  }
}

const mixinBase = mixinLoadDynamicEntry(BaseClass);

@Component({
  selector: 'app-question-group-entry-fill-blanks',
  templateUrl: './question-group-entry-fill-blanks.component.html',
  styleUrls: ['./question-group-entry-fill-blanks.component.scss']
})

export class QuestionGroupEntryFillBlanksComponent extends mixinBase implements OnInit {

  /// TODO this should extend a base entry class

  @Input() data: LessonPartEntry;
  @Input() startShowAmount = 5;
  // @ViewChild(DynamicContentDirective, {static: true}) dynamicContentHost: DynamicContentDirective;

  questions: QuestionGroup;
  questionHandler: QuestionHandler;
  questionValidators: ValidatorFn | ValidatorFn[] | null = [correctValueValidator];
  contentComponentMapping: QuestionContentComponentMapping = {};
  currentContentComponentKeyIndex: number;

  entry: LessonPartEntry;
  // dynamicContentItem: DynamicContentItem;

  constructor(private utilsService: UtilsService,
              private questionService: QuestionService,
              public componentFactoryResolver: ComponentFactoryResolver) {

    super(componentFactoryResolver);

    this.contentComponentMapping = {
      'drag-and-drop': DragDropBlanksGroupComponent,
      'drop-down': DropDownBlanksGroupComponent,
      'input-blank': FillBlanksGroupComponent,
    };
  }

  ngOnInit(): void {

    this.entry = this.data; // just for clarity

    this.questionHandler = new QuestionHandler(
      this.utilsService,
      this.entry.data.questions,
      this.startShowAmount,
      this.questionValidators
    );

    this.questions = this.questionHandler.questionGroup;
    this.questionService.addQuestionHandler(this.questionHandler);


    // const componentItem = new ContentItem(FillBlanksGroupComponent, {questionHandler: this.questionHandler});
    this.loadQuestionGroupType('drag-and-drop');
  }

  loadQuestionGroupType(key: string) {

    const keys = Object.keys(this.contentComponentMapping);
    for (const index in keys) {
      if (keys[index] === key) { this.currentContentComponentKeyIndex = Number(index); }
    }

    const dynamicComponentItem = new DynamicContentItem(this.contentComponentMapping[key], {questionHandler: this.questionHandler});
    this.loadDynamicEntry(dynamicComponentItem);
  }

  increaseDifficultyQuestionGroupType() {
    const keys = Object.keys(this.contentComponentMapping);
    if (this.currentContentComponentKeyIndex < keys.length - 1) {
      this.loadQuestionGroupType(keys[this.currentContentComponentKeyIndex + 1]);
    } else {
      this.loadQuestionGroupType(keys[0]);
    }
  }

  decreaseDifficultyQuestionGroupType() {
    const keys = Object.keys(this.contentComponentMapping);
    if (this.currentContentComponentKeyIndex !== 0) {
      this.loadQuestionGroupType(keys[this.currentContentComponentKeyIndex - 1]);
    } else {
      this.loadQuestionGroupType(keys[keys.length - 1]);
    }
  }

  addQuestion() {
    const pickedQuestion = this.questionHandler.pickQuestions(1)[0];

    if (pickedQuestion !== undefined) {
      this.questionHandler.addQuestion(pickedQuestion.id);
    }
  }

  setQuestionAmount(amount: number) {
    console.log(amount);
    this.questionHandler.setQuestionAmount(amount);
  }

  reset() {
    this.questionHandler.questionGroup.reset();
  }

}
