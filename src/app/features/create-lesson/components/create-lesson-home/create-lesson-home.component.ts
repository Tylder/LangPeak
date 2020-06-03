import { Component, OnInit } from '@angular/core';
import {LessonService} from '../../../../shared/services/lesson.service';
import {Lesson2Service} from '../../../../shared/services/lesson2.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Lesson} from '../../../../shared/models/lesson';
import {ActivatedRoute, Router} from '@angular/router';
import {LeftSidebarContentService} from '../../../../shared/services/left-sidebar-content.service';
import {DynamicContentItem} from '../../../../shared/mixins/load-dynamic-entry';
import {CreateLessonSideBarComponent} from './create-lesson-side-bar/create-lesson-side-bar.component';

@Component({
  selector: 'app-create-lesson-home',
  templateUrl: './create-lesson-home.component.html',
  styleUrls: ['./create-lesson-home.component.scss']
})
export class CreateLessonHomeComponent implements OnInit {

  lessonForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  dynamicLeftSideBarComponentItem = new DynamicContentItem(CreateLessonSideBarComponent, {});

  constructor(private lesson2Service: Lesson2Service,
              private router: Router,
              private route: ActivatedRoute,
              private leftSidebarContentService: LeftSidebarContentService) {

    this.leftSidebarContentService.currentDynamicComponentItem$.next(this.dynamicLeftSideBarComponentItem);
  }

  ngOnInit(): void {}

  createLesson(){
    const lesson: Lesson = {
      title: this.lessonForm.controls.title.value,
    };
    this.lesson2Service.addToBaseCollection$(lesson).subscribe((l) => {
      this.router.navigate([l.id], {relativeTo: this.route});
    });
  }

}
