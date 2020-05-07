import { Directive, ElementRef, HostListener, Input, Renderer2  } from '@angular/core';
import {ResizedDirective, ResizedEvent} from 'angular-resize-event';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';

@Directive({
  selector: '[appIsSmall]'
})
export class IsSmallDirective extends ResizedDirective {

  @Input('appIsSmall') class: string;
  @Input('minWidthPx') minWidthPx = 600;

  constructor(private renderer: Renderer2,
              private hostElement: ElementRef) {
    super(hostElement);

    // if (this.class === undefined)       { this.class = 'is-small'; }  // for some reason default values doesnt work on input
    // if (this.minWidthPx === undefined)  { this.minWidthPx = 600; }

    console.log(this.class);
    console.log(this.minWidthPx);

    this.resized.pipe(
      // tap(val => console.log(val)),
      map((event: ResizedEvent) => event.newWidth < this.minWidthPx),
      distinctUntilChanged(),
      tap(val => console.log(val))
    ).subscribe(isWidthSmaller => {
      if (isWidthSmaller) {this.renderer.addClass(this.hostElement.nativeElement, this.class); }
      else if (this.hostElement.nativeElement.classList.contains(this.class)) {
        this.renderer.removeClass(this.hostElement.nativeElement, this.class);
      }
    });
  }



}
