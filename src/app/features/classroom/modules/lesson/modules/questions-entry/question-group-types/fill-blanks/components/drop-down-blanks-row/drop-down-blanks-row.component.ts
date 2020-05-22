import { Component, OnInit } from '@angular/core';
import {BaseQuestionRowComponent} from '../base-question-row/base-question-row.component';

@Component({
  selector: 'app-drop-down-blanks-row',
  templateUrl: './drop-down-blanks-row.component.html',
  styleUrls: ['./drop-down-blanks-row.component.scss']
})
export class DropDownBlanksRowComponent extends BaseQuestionRowComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
