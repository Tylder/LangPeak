import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {BehaviorSubject, merge, Observable, ReplaySubject, Subscription, throwError} from 'rxjs';
import {CollectionReference, Query, QueryFn} from '@angular/fire/firestore';
import {query} from '@angular/animations';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';


export interface Filter {
  sds: string;
}

@Component({
  selector: 'app-table-base',
  template: `<p>table-base works!</p>`,

})
export class BaseTableFsComponent<T> implements OnInit, OnDestroy {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // filters$: ReplaySubject<null>;

  dataSource: MatTableDataSource<T>;
  // data$: ReplaySubject<T[]>; // contains all the data, we then filter in the frontend

  dataSub: Subscription;

  fullDisplayedColumns: string[];
  smallDisplayedColumns: string[];

  selectionValue: any;
  searchValue: string;

  selectionPredicate: (data: T, selection: any) => boolean = (data: T, selection: any) => true;
  searchPredicate: (data: T, searchValue: string) => boolean = (data: T, searchValue) => true;

  sortingDataAccessor: ((item: T, property: string) => string | number) = (item, property) => item[property];

  private filterPredicate: (data: T, filter: string) => boolean = (data: T, filter): boolean => {
    return this.selectionPredicate(data, this.selectionValue) && this.searchPredicate(data, this.searchValue);
  }

  constructor() {

    // this.data$ = new ReplaySubject<T[]>(1);
    // this.filters$ = new ReplaySubject(1);
  }


  ngOnInit(): void {
    /** If you override this once make sure you call super.ngOnInit() at the end of the OnInit method
     */
    // this.filters$ = new ReplaySubject(null);

    // this.createDataSub();
  }

  createDataSub(data$: Observable<T[]>) {

    // this.data$ = data$;

    this.dataSub = data$.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.filterPredicate;
      this.dataSource.sortingDataAccessor = this.sortingDataAccessor;
    });
    // throwError('You must implement createDataSub');

  }

  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
    // this.queryFnSub.unsubscribe();
  }
}


