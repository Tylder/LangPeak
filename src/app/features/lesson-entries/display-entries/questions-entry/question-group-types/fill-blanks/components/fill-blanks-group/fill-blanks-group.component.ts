import {Component, OnInit} from '@angular/core';
import {BaseQuestionGroupContentComponent} from '../../../base-question-group/base-question-group-content.component';


@Component({
  selector: 'app-fill-blanks-group',
  templateUrl: './fill-blanks-group.component.html',
  styleUrls: ['./fill-blanks-group.component.scss']
})
export class FillBlanksGroupComponent extends BaseQuestionGroupContentComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {}
}
