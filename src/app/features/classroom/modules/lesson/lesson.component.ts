import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {LessonService} from '../../../../shared/services/lesson.service';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})

export class LessonComponent implements OnInit {

  constructor(public lessonService: LessonService) {
    // this.lessonService.getAll$().subscribe(lessons => console.log(lessons));
  }

  ngOnInit(): void {
  }

}
