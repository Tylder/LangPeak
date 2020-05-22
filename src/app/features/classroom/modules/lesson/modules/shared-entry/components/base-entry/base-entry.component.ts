import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {EntryContentDirective} from '../../directives/entry-content.directive';
import {FillBlanksGroupComponent} from '../../../questions-entry/question-group-types/fill-blanks/components/fill-blanks-group/fill-blanks-group.component';
import {QuestionHandler} from '../../../questions-entry/classes/questionHandler';

export interface ContentComponent {
  /**
   * Every Component That will display content inside the BaseEntryComponent must implement this interface
   */
  data: any;
}



export class ContentItem  {
  /**
   *
   */
  constructor(public component: Type<any>,
              public data: {}) {}
}


@Component({
  selector: 'app-base-entry',
  template: ``,
})

export class BaseEntryComponent {
  /**
   * Base Class for showing entries on lessons, the entries could be Text, video, help, questions and so on.
   * Any entry must inherit this class and should call this.loadEntry(componentItem) with a created componentItem
   */

  @ViewChild(EntryContentDirective, {static: true}) entryContentHost: EntryContentDirective;
  @Input() data: any;
  // @Input() componentName: string;

  currentContentItem: ContentItem;

  constructor(public componentFactoryResolver: ComponentFactoryResolver) { }

  loadEntry(componentItem: ContentItem) {
    this.currentContentItem = componentItem; // save this
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentItem.component);

    const viewContainerRef = this.entryContentHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as ContentComponent).data = componentItem.data;
  }
}
