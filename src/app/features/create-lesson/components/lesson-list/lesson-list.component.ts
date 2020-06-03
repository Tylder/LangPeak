import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Lesson2Service} from '../../../../shared/services/lesson2.service';
import {Lesson, LessonPartFull} from '../../../../shared/models/lesson';
import {mergeMap, switchMap, tap} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';
import {BaseTableFsComponent} from '../../../../shared/components/base-table-fs.component';
import {Sort} from '@angular/material/sort';
import { firestore } from 'firebase';
import {QueryFn} from '@angular/fire/firestore';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent extends BaseTableFsComponent<Lesson> implements OnInit, AfterViewInit {

  // lessons$: ReplaySubject<Lesson[]>;

  fullDisplayedColumns: string[] = ['name', 'createdDate', 'modifiedDate', 'actions'];
  smallDisplayedColumns: string[] = ['name', 'createdDate', 'modifiedDate', 'actions'];



  constructor(private lesson2Service: Lesson2Service) {

    super();
  }


  ngAfterViewInit(): void {
    // super.ngAfterViewInit();


  }

  ngOnInit(): void {

    super.ngOnInit();

    this.createDataSub(this.lesson2Service.listenForLessonList$());
  }
}
