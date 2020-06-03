import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lesson2Service} from '../../../../../../../shared/services/lesson2.service';
import {LessonPartEntry, LessonPartEntryType, LessonPartPartial, PartTypes} from '../../../../../../../shared/models/lesson';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {switchMap, take, tap} from 'rxjs/operators';

interface PartsLayout {
  mainExpanded: boolean;
  prepExpanded: boolean;
  homeworkExpanded: boolean;
}

@Component({
  selector: 'app-side-bar-part-list',
  templateUrl: './sidebar-part-list.component.html',
  styleUrls: ['./sidebar-part-list.component.scss']
})
export class SidebarPartListComponent implements OnInit {

  partsLayout: PartsLayout;

  partTypes = PartTypes;  // used to get access to the enum in template

  // @Input() lessonId: string;

  lessonId: string;
  partId: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public lesson2Service: Lesson2Service) {
  }

  ngOnInit(): void {

    this.lesson2Service.lesson$.subscribe(lesson => this.lessonId = lesson.id);
    this.lesson2Service.lessonPart$.subscribe(part => this.partId = part.id);

    // this.lesson2Service.listenForLessonPartListSeparated$(this.lessonId)
    //   .subscribe(partsSeparated => this.lesson2Service.lessonPartsSeparated$.next(partsSeparated));

    // this.lesson2Service.lessonPart$.subscribe(val => console.log(val));

    this.partsLayout = {
      mainExpanded: true,
      prepExpanded: true,
      homeworkExpanded: true
    };

  }

  toggleExpand(type: string) {
    if (type === 'main') { this.partsLayout.mainExpanded = !this.partsLayout.mainExpanded; }
    else if (type === 'prep') { this.partsLayout.prepExpanded = !this.partsLayout.prepExpanded; }
    if (type === 'homework') { this.partsLayout.homeworkExpanded = !this.partsLayout.homeworkExpanded; }
  }

  goToPart(partId: string) {
    return this.router.navigate(['edit', this.lessonId, partId], {relativeTo: this.route});
  }

  addPart(type: PartTypes) {

    this.lesson2Service.lessonPartsSeparated$.pipe(
      take(1),
      switchMap((partsSeparated) => {
        const index = partsSeparated[type].length + 1;

        const part: LessonPartPartial = {
          title: 'New Part ' + index,
          index,
          type,
        };
        return this.lesson2Service.addPartToLesson$(part, this.lessonId);
      })
    // ).pipe(
    //  switchMap((part) => {
    //    const entry: LessonPartEntry = {
    //      type: LessonPartEntryType.TEXT,
    //      index: 0,
    //      data: {text: 'Insert Entry Text'},
    //    };
    //    return this.lesson2Service.addEntryToPart$(entry, part.path);
    //  })
    ).pipe(
      tap(lessonPart => {
        this.goToPart(lessonPart.id);
      })
    ).subscribe();
  }

  drop(event: CdkDragDrop<any>) {

    console.log(event);

    if (event.previousContainer === event.container) { // moved withing same list
      this.lesson2Service.lessonPartMoveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
        .subscribe();

    } else { // moved to different list

      const currentListId = event.container.id;
      let currentListType: PartTypes;

      if (currentListId === 'main')           { currentListType = PartTypes.MAIN; }
      else if (currentListId === 'prep')      { currentListType = PartTypes.PREPARE; }
      else if (currentListId === 'homework')  { currentListType = PartTypes.HOMEWORK; }

      this.lesson2Service.lessonPartTransferItemBetweenArray(event.previousContainer.data,
                                                             event.container.data,
                                                             event.previousIndex,
                                                             event.currentIndex,
                                                             currentListType)
        .subscribe();
    }
  }
}
