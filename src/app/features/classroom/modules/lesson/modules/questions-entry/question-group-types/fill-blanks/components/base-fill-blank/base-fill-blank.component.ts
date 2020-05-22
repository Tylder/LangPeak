import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Question} from '../../../../models/question';

@Component({
  selector: 'app-base-fill-blank',
  template: ``,
  styleUrls: []
})
export class BaseFillBlankComponent implements OnInit {

  @Input() question: Question;

  constructor() {
  }

  ngOnInit(): void {
  }

}
