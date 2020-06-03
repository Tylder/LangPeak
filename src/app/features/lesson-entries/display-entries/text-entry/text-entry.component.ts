import {Component, Input, OnInit} from '@angular/core';
import {BaseEntryComponent} from '../../shared-entry/components/base-entry/base-entry.component';
import {LessonPartEntry, QuestionData} from '../../../../shared/models/lesson';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss']
})
export class TextEntryComponent extends BaseEntryComponent implements OnInit {

  @Input() data: LessonPartEntry;

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
