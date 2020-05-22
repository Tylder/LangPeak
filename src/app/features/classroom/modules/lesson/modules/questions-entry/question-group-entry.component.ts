import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {QuestionData} from '../../models/db/lesson';
import {QuestionGroup} from './models/questionGroup';
import {QuestionHandler} from './classes/questionHandler';
import {ValidatorFn} from '@angular/forms';
import {correctValueValidator} from './models/question';
import {UtilsService} from '../../../../../../shared/services/utils.service';
import {QuestionService} from '../../services/state/question.service';
import {EntryContentDirective} from '../shared-entry/directives/entry-content.directive';
import {FillBlanksGroupComponent} from './question-group-types/fill-blanks/components/fill-blanks-group/fill-blanks-group.component';
import {BaseEntryComponent, ContentItem} from '../shared-entry/components/base-entry/base-entry.component';
import {BaseQuestionGroupContentComponent} from './question-group-types/base-question-group/base-question-group-content.component';
import {DropDownBlanksGroupComponent} from './question-group-types/fill-blanks/components/drop-down-blanks-group/drop-down-blanks-group.component';
import {DragDropBlanksGroupComponent} from './question-group-types/fill-blanks/components/drag-drop-blanks-group/drag-drop-blanks-group.component';

// class QuestionGroupItem extends ContentItem {
//   constructor(public component: Type<any>,
//               public questionHandler: QuestionHandler) {}
// }

interface QuestionContentComponentMapping {
  /**
   * Mapping of Content Components, ex. {'fill-blank': FillBlanksGroupComponent}
   */
  [key: string]: Type<any>;
}

@Component({
  selector: 'app-question-group-entry',
  templateUrl: './question-group-entry.component.html',
  styleUrls: ['./question-group-entry.component.scss']
})
export class QuestionGroupEntryComponent extends BaseEntryComponent implements OnInit {

  /// TODO this should extend a base entry class

  @Input() data: QuestionData[];
  @Input() startShowAmount = 5;

  questions: QuestionGroup;
  questionHandler: QuestionHandler;
  questionValidators: ValidatorFn | ValidatorFn[] | null = [correctValueValidator];
  contentComponentMapping: QuestionContentComponentMapping = {};

  currentContentComponentKeyIndex: number;

  constructor(private utilsService: UtilsService,
              private questionService: QuestionService,
              componentFactoryResolver: ComponentFactoryResolver) {

    super(componentFactoryResolver);

    this.contentComponentMapping = {
      'drag-and-drop': DragDropBlanksGroupComponent,
      'drop-down': DropDownBlanksGroupComponent,
      'fill-blank': FillBlanksGroupComponent,
    };
  }

  ngOnInit(): void {

    this.questionHandler = new QuestionHandler(
      this.utilsService,
      this.data,
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

    const componentItem = new ContentItem(this.contentComponentMapping[key], {questionHandler: this.questionHandler});
    this.loadEntry(componentItem);
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
