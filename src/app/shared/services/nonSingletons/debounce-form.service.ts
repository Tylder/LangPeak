import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {debounceTime, takeUntil, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebounceFormService<T> {
  /**
   * Meant to be used when you have a form that you need to debounce before updating a db.
   * But you also want to make sure you fire an update if there has been a change and you exit the component but the debounce timer
   * hasnt fired yet.
   *
   * Basically minimizing updates but making sure non are missed.
   */

  // formValueChanges$: Observable<any>;
  //
  public updateDb$: Subject<T>; // sub to this in the component to know when to update the db

  private destroy$: Subject<any>;

  private formValueChanges$: Observable<T>;
  private debounceMs: number;

  private nonSavedFormValueChange$: BehaviorSubject<T>;

  constructor() {
    this.updateDb$ = new Subject<T>();
    this.nonSavedFormValueChange$ = new BehaviorSubject<T>(null);
    this.destroy$ = new Subject<any>();
  }

  setFormValueChanges$(formValueChanges: Observable<T>) {
    this.formValueChanges$ = formValueChanges.pipe(takeUntil(this.destroy$));
  }

  setDebounceMs(debounceMs: number) {
    this.debounceMs = debounceMs;
  }

  start() {
    if (this.formValueChanges$ && this.debounceMs) {
      this.formValueChanges$.pipe(
        // tap(val => console.log(val)),
        tap((data) => this.nonSavedFormValueChange$.next(data as T)), // save the unsavedData
        debounceTime(this.debounceMs),
        tap(() => this.nonSavedFormValueChange$.next(null)), // empty unsavedData after debounce
        takeUntil(this.destroy$),
      ).subscribe(data => this.updateDb$.next(data));
    }


    // this.nonSavedFormValueChange$.subscribe(val => console.log(val));
  }

  onExit(){

    const nonSavedData = this.nonSavedFormValueChange$.getValue();

    // console.log(nonSavedData);

    if (nonSavedData) {
      this.updateDb$.next(nonSavedData);
    }

    this.destroy$.next();
    // this.formValueChanges$.subscribe((data) => {
    //   if (data); } {
    // });
  }

}
