import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Lesson2Service} from '../../../../../../shared/services/lesson2.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {DynamicContentItem} from '../../../../../../shared/mixins/load-dynamic-entry';
import {PartEditorRightSideBarComponent} from '../../components/part-editor-right-side-bar/part-editor-right-side-bar.component';
import {map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {LessonPartEntry, LessonPartEntryType, LessonPartFull, PartTypes} from '../../../../../../shared/models/lesson';
import {DbItem, DbItemFullWithIndex} from '../../../../../../shared/models/dbItem';

@Component({
  selector: 'app-part-editor',
  templateUrl: './part-editor.component.html',
  styleUrls: ['./part-editor.component.scss']
})
export class PartEditorComponent implements OnInit, OnDestroy, OnChanges {

  partId$: Observable<string>;
  // part: LessonPartFull;
  destroy$: Subject<any>;
  part: LessonPartFull;
  entries: LessonPartEntry[];

  entryType = LessonPartEntryType;

  selectedEntryId: string;
  // partListener$ = Observable<any>;

  dynamicRightSideBarComponentItem = new DynamicContentItem(PartEditorRightSideBarComponent, {widthPx: 300});

  constructor(public lesson2Service: Lesson2Service,
              private route: ActivatedRoute) {

    let prevPart;
    this.lesson2Service.lessonPart$.pipe(
      tap(part => prevPart = this.part),
      tap(part => console.log(part, prevPart)),
      tap(part => this.part = part),
      switchMap(part => {
        if (prevPart && prevPart.entries.length > part.entries.length) {
          console.log('here');
          return this.lesson2Service.updateIndexAfterDeleteInIndexedDocs(part.entries as DbItemFullWithIndex[]);
        } else {
          return of(part);
        }
      }),
    ).subscribe();

    this.destroy$ = new Subject<any>();
  }

  createPartListener(partId: string) {

    return this.lesson2Service.lesson$.pipe(
      // tap(lesson => console.log(lesson)),
      mergeMap(lesson => {
        return this.lesson2Service.listenForLessonPart$(lesson.id, partId).pipe(
          tap(part => this.lesson2Service.lessonPart$.next(part)),
          // tap(val => console.log(val))
        );
      }),
    ).pipe(
      tap(val => console.log(val)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  drop(event) {
    console.log(event);

    if (event.previousContainer === event.container) { // moved withing same list

      const batch = this.lesson2Service.getBatchFromMoveItemInIndexedDocs(this.part.entries as DbItemFullWithIndex[],
                                                                          event.previousIndex,
                                                                          event.currentIndex);

      this.lesson2Service.batchCommit(batch).subscribe();
    }
    // } else { // moved to different list
    //
    //   const currentListId = event.container.id;
    //   let currentListType: PartTypes;
    //
    //   if (currentListId === 'main')           { currentListType = PartTypes.MAIN; }
    //   else if (currentListId === 'prep')      { currentListType = PartTypes.PREPARE; }
    //   else if (currentListId === 'homework')  { currentListType = PartTypes.HOMEWORK; }
    //
    //   this.lesson2Service.lessonPartTransferItemBetweenArray(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex,
    //     currentListType)
    //     .subscribe();
    // }
  }


  trackEntries(index: number, entry: LessonPartEntry) {
    // if (entry.id === this.selectedEntryId) { return entry.id; }
    // else { return entry; }
    return entry.id;
  }

  addEntry(entryType: LessonPartEntryType) {
    const entry: LessonPartEntry = {
      type: entryType,
      index: this.part.entries.length
    };
    this.lesson2Service.addEntryToPart$(entry, this.part).subscribe();
  }

  entrySelected(entryId) {
    console.log(entryId);

    this.selectedEntryId = entryId;
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
