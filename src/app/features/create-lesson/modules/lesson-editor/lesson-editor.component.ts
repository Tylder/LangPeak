import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Lesson, LessonPartFull, LessonPartPartial} from '../../../../shared/models/lesson';
import {Lesson2Service} from '../../../../shared/services/lesson2.service';
import {Observable, ReplaySubject, Subject, throwError, zip} from 'rxjs';
import {map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {LeftSidebarContentService} from '../../../../shared/services/left-sidebar-content.service';
import {DynamicContentItem} from '../../../../shared/mixins/load-dynamic-entry';
import {CreateLessonSideBarComponent} from '../../components/create-lesson-home/create-lesson-side-bar/create-lesson-side-bar.component';
import {SidebarPartListComponent} from './components/part-editor-left-sidebar/side-bar-part-list/sidebar-part-list.component';
import {PartEditorLeftSidebarComponent} from './components/part-editor-left-sidebar/part-editor-left-sidebar.component';

@Component({
  selector: 'app-lesson-info-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.scss']
})
export class LessonEditorComponent implements OnInit, OnDestroy {

  destroy$: Subject<any>;

  dynamicLeftSideBarComponentItem = new DynamicContentItem(PartEditorLeftSidebarComponent, {widthPx: 300});

  constructor(private route: ActivatedRoute,
              public lesson2Service: Lesson2Service,
              private leftSidebarContentService: LeftSidebarContentService) {

    this.destroy$ = new Subject<any>();

    //
    // this.route.paramMap.subscribe(val => console.log(val));
    //
    // this.lessonId$ = this.route.paramMap.pipe(
    //   tap(val => console.log(val)),
    //   map((paramMap) => paramMap.get('lessonId')),
    // );
    //
  //   this.lesson2Service.lesson$.pipe(
  //     tap(lesson => {
  //       // this.dynamicLeftSideBarComponentItem.data.lessonId = id;
  //
  //     }),
  //     mergeMap(lessonId => this.lesson2Service.listenForLesson$(lessonId))
  //   ).subscribe(lesson => this.lesson2Service.lesson$.next(lesson));
  }

  ngOnInit(): void {
    this.createLessonListeners();

    this.leftSidebarContentService.currentDynamicComponentItem$.next(this.dynamicLeftSideBarComponentItem);

    this.lesson2Service.lesson$.subscribe(val => console.log(val));
  }

  createLessonListeners() {

    // const lessonId = this.route.snapshot.paramMap.get('lessonId');

    const lessonId$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('lessonId')),
      tap(val => console.log(val)),
    );

    const lesson$ = lessonId$.pipe(
      mergeMap(lessonId => {
        return this.lesson2Service.listenForLesson$(lessonId).pipe(
          tap(lesson => this.lesson2Service.lesson$.next(lesson)),
        );
      })
    );

    const lessonParts$ = lessonId$.pipe(
      mergeMap(lessonId => {
        return this.lesson2Service.listenForLessonParts$(lessonId).pipe(
          tap((parts: LessonPartPartial[]) => this.lesson2Service.lessonParts$.next(parts))
        );
      })
    );

    const lessonPartListSeparated$ = lessonId$.pipe(
      mergeMap(lessonId => {
        return this.lesson2Service.listenForLessonPartListSeparated$(lessonId).pipe(
          tap((parts) => this.lesson2Service.lessonPartsSeparated$.next(parts))
        );
      })
    );

    zip(lesson$, lessonParts$, lessonPartListSeparated$).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    console.log('DESTROY');
    this.destroy$.next();
  }
}
