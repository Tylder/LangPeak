import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appClickable]'
})
export class ClickableDirective implements OnChanges {

  @Input('appClickable') isClickable: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isClickable === false) {
      this.renderer.removeStyle(this.el.nativeElement, 'cursor');
      this.renderer.removeStyle(this.el.nativeElement, 'outline');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
      this.renderer.setStyle(this.el.nativeElement, 'outline', 0);
    }
  }
}
