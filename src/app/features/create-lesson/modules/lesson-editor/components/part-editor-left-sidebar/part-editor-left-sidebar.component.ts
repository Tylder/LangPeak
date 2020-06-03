import {Component, Input, OnInit} from '@angular/core';
import {Lesson2Service} from '../../../../../../shared/services/lesson2.service';

@Component({
  selector: 'app-part-editor-left-sidebar',
  templateUrl: './part-editor-left-sidebar.component.html',
  styleUrls: ['./part-editor-left-sidebar.component.scss']
})
export class PartEditorLeftSidebarComponent implements OnInit {

  @Input() data: {
    lessonId: string,
    widthPx: number,
    [key: string]: any
  };

  constructor(public lesson2Service: Lesson2Service) { }

  ngOnInit(): void {
  }

}
