import {Component, Input, OnInit} from '@angular/core';
import {BaseEntryComponent} from '../../shared-entry/components/base-entry/base-entry.component';
import {LessonPartEntry, QuestionData} from '../../../../shared/models/lesson';

@Component({
  selector: 'app-text-entry-edit',
  templateUrl: './text-entry-edit.component.html',
  styleUrls: ['./text-entry-edit.component.scss']
})
export class TextEntryEditComponent extends BaseEntryComponent implements OnInit {

  @Input() data: LessonPartEntry;

  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);
  }

}
