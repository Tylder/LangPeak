import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fill-blank-valid',
  templateUrl: './fill-blank-valid.component.html',
  styleUrls: ['./fill-blank-valid.component.scss']
})
export class FillBlankValidComponent implements OnInit {

  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
