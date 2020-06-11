import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Lesson2Service} from '../../../../../../shared/services/lesson2.service';
import {Lesson, LessonPartPartial} from '../../../../../../shared/models/lesson';
import {switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject, zip} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lesson-info-editor',
  templateUrl: './lesson-info-editor.component.html',
  styleUrls: ['./lesson-info-editor.component.scss']
})
export class LessonInfoEditorComponent implements OnInit, OnDestroy {

  lessonForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              public lesson2Service: Lesson2Service) {

  }

  ngOnInit(): void {
    // this.createLessonListeners();

    this.lessonForm = this.formBuilder.group({
      title: new FormControl(null, {validators: [Validators.required]}),
    });

    this.lesson2Service.lesson$.subscribe(lesson => {
      this.lessonForm.patchValue(lesson);
    });

  }

  reset() {
    this.lesson2Service.lesson$.subscribe(lesson => {
      this.lessonForm.patchValue(lesson);
    });
  }

  updateLesson() {
    this.lesson2Service.lesson$.pipe(
      take(1),
      switchMap(lesson => {
        return this.lesson2Service.updateLesson$(this.lessonForm.value, lesson.id);
      })
    ).subscribe();

  }

  ngOnDestroy(): void {
    console.log('DESTROY');
    // this.destroy$.next();
  }

}
