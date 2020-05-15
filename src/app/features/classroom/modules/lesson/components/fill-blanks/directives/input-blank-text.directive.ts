import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appInputBlankText]'
})
export class InputBlankTextDirective implements OnInit {

  MIN_WIDTH = 50;

  @Input('appInputBlankText') textLength: number;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    const width: number = Math.max((this.textLength * 10), this.MIN_WIDTH);
    this.el.nativeElement.style.width = width.toString() + 'px';
  }

}
