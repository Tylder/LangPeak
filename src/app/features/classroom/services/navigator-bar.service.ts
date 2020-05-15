import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isExpanded$: BehaviorSubject<boolean>;  // true if the you can see more than just the icons
  isFixedExpanded$: BehaviorSubject<boolean>;  // true if we click the expand button if the screen is wide enough
  isVisible$: BehaviorSubject<boolean>; // true if we show the menu at all, trumps everything else

  constructor() {
    this.isExpanded$ = new BehaviorSubject(false);
    this.isFixedExpanded$ = new BehaviorSubject(false);
    this.isVisible$ = new BehaviorSubject(true);
  }

  expandOnHover() {
    this.isExpanded$.next(true);
  }

  contractOnHoverEnd() {
    // only contract on HoverEnd if isFixed is false;
    if (!this.isFixedExpanded$.getValue()) {
      this.isExpanded$.next(false);
    }
  }

  setIsFixed(isFixed: boolean) {
    this.isFixedExpanded$.next(isFixed);
    this.isExpanded$.next(isFixed);
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible$.next(isVisible);
  }

  toggleIsFixed() {
    this.setIsFixed(!this.isFixedExpanded$.getValue());
  }

  toggleIsVisible() {
    this.setIsVisible(!this.isVisible$.getValue());
  }
}
