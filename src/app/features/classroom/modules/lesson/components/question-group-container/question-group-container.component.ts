import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionData} from '../../models/db/lesson';
import {QuestionGroup} from '../../models/lesson/questionGroup';
import {QuestionHandler} from '../../classes/QuestionHandler';
import {ValidatorFn} from '@angular/forms';
import {correctValueValidator} from '../../models/lesson/question';
import {UtilsService} from '../../../../../../shared/services/utils.service';
import {QuestionService} from '../../services/state/question.service';
import {EntryContentDirective} from '../../directives/entry-content.directive';
import {FillBlanksGroupComponent} from '../fill-blanks/fill-blanks-group.component';
import {BaseEntryComponent} from '../base-entry/base-entry.component';
import {QuestionGroupItem} from '../../questions/models/questionGroupEntryContent';

@Component({
  selector: 'app-question-group-container',
  templateUrl: './question-group-container.component.html',
  styleUrls: ['./question-group-container.component.scss']
})
export class QuestionGroupContainerComponent  implements OnInit {

  /// TODO this should extend a base entry class

  @Input() questionsData: QuestionData[];
  @Input() startShowAmount = 5;

  @ViewChild(EntryContentDirective, {static: true}) questionGroupHost: EntryContentDirective;

  questions: QuestionGroup;
  questionHandler: QuestionHandler;
  questionValidators: ValidatorFn | ValidatorFn[] | null = [correctValueValidator];

  constructor(private utilsService: UtilsService,
              private questionService: QuestionService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.questionHandler = new QuestionHandler(
      this.utilsService,
      this.questionsData,
      this.startShowAmount,
      this.questionValidators
    );

    this.loadEntry();

    this.questions = this.questionHandler.questionGroup;
    this.questionService.addQuestionHandler(this.questionHandler);
  }

  addQuestion() {
    const pickedQuestion = this.questionHandler.pickQuestions(1)[0];
    this.questionHandler.addQuestion(pickedQuestion.id);
  }

  loadEntry() {
    const componentItem = new QuestionGroupItem(FillBlanksGroupComponent, this.questionHandler);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentItem.component);

    const viewContainerRef = this.questionGroupHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as FillBlanksGroupComponent).questionHandler = componentItem.questionHandler;
  }

}
