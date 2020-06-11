import {Component, Input, OnInit} from '@angular/core';
import {BaseEntryComponent} from '../../shared-entry/components/base-entry/base-entry.component';
import {LessonPartEntry, QuestionData} from '../../../../shared/models/lesson';
import {Observable} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Lesson2Service} from '../../../../shared/services/lesson2.service';

@Component({
  selector: 'app-text-entry',
  templateUrl: './text-entry.component.html',
  styleUrls: ['./text-entry.component.scss']
})
export class TextEntryComponent extends BaseEntryComponent implements OnInit {

  @Input() data: LessonPartEntry;

  constructor(private lesson2Service: Lesson2Service) {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.lesson2Service.listenForPartEntry$(this.data.path).pipe(
    ).subscribe((entry) => this.data = entry);  // we need to update the data since we arent reloading the component
  }

}
