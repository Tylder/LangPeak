import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Lesson2Service} from '../../../../../../shared/services/lesson2.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subject, zip} from 'rxjs';
import {DynamicContentItem} from '../../../../../../shared/mixins/load-dynamic-entry';
import {PartEditorRightSideBarComponent} from '../../components/part-editor-right-side-bar/part-editor-right-side-bar.component';
import {map, mergeMap, take, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-part-editor',
  templateUrl: './part-editor.component.html',
  styleUrls: ['./part-editor.component.scss']
})
export class PartEditorComponent implements OnInit, OnDestroy, OnChanges {

  partId$: Observable<string>;
  // part: LessonPartFull;
  destroy$: Subject<any>;
  // partListener$ = Observable<any>;

  dynamicRightSideBarComponentItem = new DynamicContentItem(PartEditorRightSideBarComponent, {widthPx: 300});

  constructor(public lesson2Service: Lesson2Service,
              private route: ActivatedRoute) {

    console.log('sdsdsdadas');


    this.destroy$ = new Subject<any>();
  }

  createPartListener(partId: string) {

    return this.lesson2Service.lesson$.pipe(
      tap(lesson => console.log(lesson)),
      mergeMap(lesson => {
        return this.lesson2Service.listenForLessonPart$(lesson.id, partId).pipe(
          tap(part => this.lesson2Service.lessonPart$.next(part)),
          tap(val => console.log(val))
        );
      }),
    ).pipe(
      tap(val => console.log(val)),
      takeUntil(this.destroy$)
    ).subscribe();

  }

  ngOnInit(): void {
    console.log('on init');
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('partId')),
      tap(() => this.destroy$.next()),
      tap(partId => this.createPartListener(partId)),
    ).subscribe();

  }

  ngOnDestroy(): void {
    console.log('PART DESTROY');
    this.destroy$.next();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
