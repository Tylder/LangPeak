import { Component, OnInit } from '@angular/core';
import {BaseQuestionRowComponent} from '../base-question-row/base-question-row.component';

@Component({
  selector: 'app-drag-drop-blanks-row',
  templateUrl: './drag-drop-blanks-row.component.html',
  styleUrls: ['./drag-drop-blanks-row.component.scss']
})
export class DragDropBlanksRowComponent extends BaseQuestionRowComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
