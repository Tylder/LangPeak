import { Component, OnInit } from '@angular/core';
import {BaseQuestionGroupContentComponent} from '../../../base-question-group/base-question-group-content.component';

@Component({
  selector: 'app-drop-down-blanks-group',
  templateUrl: './drop-down-blanks-group.component.html',
  styleUrls: ['./drop-down-blanks-group.component.scss']
})
export class DropDownBlanksGroupComponent extends BaseQuestionGroupContentComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
