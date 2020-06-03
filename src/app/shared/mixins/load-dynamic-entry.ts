import {Component, ComponentFactoryResolver, ElementRef, Input, OnInit, Type, ViewChild} from '@angular/core';
import {DynamicContentDirective} from '../directives/dynamic-content.directive';
import {Constructor} from './constructor';


export interface DynamicContentComponent {
  /**
   * Every Component That will display-entries content inside the DynamicLoader must implement this interface
   */
  data: { [key: string]: any };
}

export class DynamicContentItem  {
  /**
   *
   */
  constructor(public component: Type<any>,
              public data: { [key: string]: any }
              ) {}
}

export interface HasComponentFactoryResolver {
  componentFactoryResolver: ComponentFactoryResolver;
}

export function mixinLoadDynamicEntry<T extends Constructor<HasComponentFactoryResolver>>(Base: T) {
  /**
   * Base Class for showing entries on lessons, the entries could be Text, video, help, questions and so on.
   * Any entry must inherit this class and should call this.loadEntry(componentItem) with a created componentItem
   */

  class TWithMixin extends Base {

    @ViewChild(DynamicContentDirective, {static: true}) dynamicContentHost: DynamicContentDirective;

    data: any;

    dynamicContentItem: DynamicContentItem;

    currentContentComponentKeyIndex: number;

    contentComponentMapping: {[key: string]: Type<any> } = {};  // overload with the components you wish to be able to show

    constructor(...args: any[]) {
      super(...args);
    }

    loadDynamicEntry(dynamicComponentItem: DynamicContentItem) {
      this.dynamicContentItem = dynamicComponentItem; // save this
      console.log(dynamicComponentItem);

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponentItem.component);

      const viewContainerRef = this.dynamicContentHost.viewContainerRef;
      viewContainerRef.clear();

      const componentRef = viewContainerRef.createComponent(componentFactory);
      (componentRef.instance as DynamicContentComponent).data = dynamicComponentItem.data;
    }

    loadDynamicEntryByKey(key: string) {

      const keys = Object.keys(this.contentComponentMapping);

      if (!keys.find(k => k === key)) {
        throw new Error('Key: \'' + key + '\' not found in contentComponentMapping');
      }

      for (const index in keys) {
        if (keys[index] === key) { this.currentContentComponentKeyIndex = Number(index); }
      }
      console.log(this.currentContentComponentKeyIndex);
      const dynamicComponentItem = new DynamicContentItem(this.contentComponentMapping[key], this.data);
      console.log(dynamicComponentItem);
      this.loadDynamicEntry(dynamicComponentItem);
    }
  }
  return TWithMixin;
}
