import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {fromEvent, merge, Observable, Subscription} from 'rxjs';
import {delay, repeat, takeUntil, tap} from 'rxjs/operators';

@Directive({
  selector: '[appLongClick]'
})
export class LongClickDirective implements AfterViewInit{

  @Input('appLongClick') delayMs = 500;
  @Output() longClick = new EventEmitter<null>();

  mouseDown$: Observable<any>;
  mouseUp$: Observable<any>;

  touchStart$: Observable<any>;
  touchEnd$: Observable<any>;

  constructor(private hostElement: ElementRef) {}

  ngAfterViewInit(): void {
    this.mouseDown$ = fromEvent(this.hostElement.nativeElement, 'mousedown');
    this.mouseUp$ = fromEvent(this.hostElement.nativeElement, 'mouseup');
    this.touchStart$ = fromEvent(this.hostElement.nativeElement, 'touchstart');
    this.touchEnd$ = fromEvent(this.hostElement.nativeElement, 'touchend');

    merge(this.mouseDown$, this.touchStart$).pipe(
      // tap(() => console.log('DOWN')),
      delay(this.delayMs),
      takeUntil(merge(this.mouseUp$, this.touchEnd$)),
      repeat(),
      tap(() => console.log('long click')),
    ).subscribe(() => this.longClick.emit());
  }

}
