import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild} from '@angular/core';
import {DynamicContentComponent} from '../../../../../shared/mixins/load-dynamic-entry';


@Component({
  selector: 'app-base-entry',
  template: ``,
})

export class BaseEntryComponent implements DynamicContentComponent {
  /**
   * Base Class for showing entries on lessons, the entries could be Text, video, help, questions and so on.
   * Any entry must inherit this class and should call this.loadEntry(componentItem) with a created componentItem
   */
  @Input() data: { [key: string]: any };
}
