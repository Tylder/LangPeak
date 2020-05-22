import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appInputBlankText]'
})
export class InputBlankTextDirective implements OnInit {

  MIN_WIDTH = 50;

  @Input('appInputBlankText') textLength: number;
  @Input('useMinWidth') isUseMinWidth = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const width: number = Math.max((this.textLength * 10), this.MIN_WIDTH);
    if (this.isUseMinWidth) { this.el.nativeElement.style.minWidth = width.toString() + 'px'; }
    else { this.el.nativeElement.style.width = width.toString() + 'px'; }

  }

}
