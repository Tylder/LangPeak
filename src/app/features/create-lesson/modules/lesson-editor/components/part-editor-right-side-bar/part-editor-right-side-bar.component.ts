import { Component, OnInit } from '@angular/core';
import {Lesson2Service} from '../../../../../../shared/services/lesson2.service';

@Component({
  selector: 'app-part-editor-right-side-bar',
  templateUrl: './part-editor-right-side-bar.component.html',
  styleUrls: ['./part-editor-right-side-bar.component.scss']
})
export class PartEditorRightSideBarComponent implements OnInit {

  constructor(public lesson2Service: Lesson2Service) { }

  ngOnInit(): void {
    // this.lesson2Service.lesson$.next({title: 'sdsdsd', id: 'sdsd', path: '123123'});
  }

}
