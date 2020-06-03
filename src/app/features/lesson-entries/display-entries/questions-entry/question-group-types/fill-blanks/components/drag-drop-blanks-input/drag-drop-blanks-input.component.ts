import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseFillBlankComponent} from '../base-fill-blank/base-fill-blank.component';
import {QuestionAnswer} from '../drag-drop-blanks-group/drag-drop-blanks-group.component';
import {CdkDragDrop, CdkDragExit, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {filter, map, tap} from 'rxjs/operators';
import {Question} from '../../../../models/question';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'app-drag-drop-blanks-input',
  templateUrl: './drag-drop-blanks-input.component.html',
  styleUrls: ['./drag-drop-blanks-input.component.scss']
})
export class DragDropBlanksInputComponent extends BaseFillBlankComponent implements OnInit, OnDestroy {

  answers: QuestionAnswer[] = [];

  dragAndDropParkAnswers$: BehaviorSubject<QuestionAnswer[]>;

  constructor() {
    super();

  }

  ngOnInit(): void {
    if (this.question.fullValue !== undefined && this.question.fullValue !== null) {
      this.answers = [this.question.fullValue];
    }
    this.dragAndDropParkAnswers$ = this.question.questionHandler.data.dragAndDropParkAnswers$;
  }

  ngOnDestroy(): void {}


  itemDrop(event: CdkDragDrop<any>) {

    console.log(event);
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('Transferring item to new container');

      // if (this.question.hasValue()){
      //   // we have a value already so push the old one to the park
      //   // const dragAndDropParkItems = this.question.questionHandler.data.dragAndDropParkItems;
      //   // dragAndDropParkItems.push(this.question.fullValue);
      //   const updatedDragAndDropPark = this.dragAndDropParkAnswers$.getValue();
      //   updatedDragAndDropPark.push(this.question.fullValue);
      //   this.dragAndDropParkAnswers$.next(updatedDragAndDropPark);
      //   // this.answers = [];
      //   // event.container.data = event.container.data.splice(1);
      // }

      let prevContainerData = event.previousContainer.data;

      let alt: QuestionAnswer;
      if (Array.isArray(prevContainerData)) { // came from the park
        alt = prevContainerData[event.previousIndex] as QuestionAnswer;
        // prevContainerData.splice(event.previousIndex, 1);
      } else { // came from other question
        prevContainerData = prevContainerData as Question;
        alt = prevContainerData.fullValue;
        // prevContainerData.setValue(null);
      }

      console.log(prevContainerData);

      // transferArrayItem(event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   0);


      console.log(this.answers);
      // event.previousContainer.data = event.previousContainer.data.splice(event.previousIndex); // remove from park

      this.question.setValue(alt.answer, undefined, alt);
      this.question.markAsTouched();
      this.question.markAsDirty();
    }

  }
  //
  // itemExited(event: CdkDragExit<QuestionAnswer[]>) {
  //   // this.answers = [];
  //   // if (event.container === )
  //   // this.question.setValue(null);
  //   console.log(event);
  // }
}
