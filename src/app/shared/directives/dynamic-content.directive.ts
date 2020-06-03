import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appEntryContent]'
})
export class DynamicContentDirective {

  /**
   * Used to host dynamic components for Entry Content...i.e inside the entry
   */

  constructor(public viewContainerRef: ViewContainerRef) { }

}
