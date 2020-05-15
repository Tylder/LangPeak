import {Component, Input, OnInit} from '@angular/core';
import {BaseFillBlankComponent} from '../base-fill-blank/base-fill-blank.component';
import {FormControl, Validators} from '@angular/forms';
import {debounceTime, map} from 'rxjs/operators';
import {Question} from '../../../../models/lesson/question';

@Component({
  selector: 'app-fill-blank-text',
  templateUrl: './fill-blank-text.component.html',
  styleUrls: ['./fill-blank-text.component.scss']
})
export class FillBlankTextComponent extends BaseFillBlankComponent implements OnInit {

  constructor() {
    super();
  }

ngOnInit(): void {

  console.log(this.question);

    // this.textInput.valueChanges.pipe(
    //   debounceTime(250),
    //   map((value: string) => value.toLowerCase()),
    // ).subscribe(this.currentValue$); // take current value from the textInput
    // this.currentValue$.subscribe(value => this.checkIsValid(this.textPart.text.toLowerCase())); // check if valid on each check
  }

}
