import {Component, ComponentFactoryResolver, Input, OnInit} from '@angular/core';
import {DynamicContentItem, mixinLoadDynamicEntry} from '../../../../../../shared/mixins/load-dynamic-entry';
import {LessonPartEntry} from '../../../../../../shared/models/lesson';
import {QuestionGroupEntryFillBlanksComponent} from '../../../../../lesson-entries/display-entries/questions-entry/question-group-entry-fill-blanks.component';
import {TextEntryComponent} from '../../../../../lesson-entries/display-entries/text-entry/text-entry.component';

class BaseClass {
  constructor(public componentFactoryResolver: ComponentFactoryResolver) {
  }
}

const mixinBase = mixinLoadDynamicEntry(BaseClass);

@Component({
  selector: 'app-part-entry',
  templateUrl: './part-entry.component.html',
  styleUrls: ['./part-entry.component.scss']
})
export class PartEntryComponent extends mixinBase implements OnInit {
  /**
   * This is a generic component which dynamically loads an entry depending on the data its given
   */

  @Input() data: LessonPartEntry;

  contentComponentMapping = {
    fillBlanks: QuestionGroupEntryFillBlanksComponent,
    text: TextEntryComponent,
  };

  constructor(public componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }

  ngOnInit(): void {
    this.loadDynamicEntryByKey(this.data.type);
    console.log(this.data);
  }
  //
  // loadDynamicEntryByKey(key: string) {
  //
  //   const keys = Object.keys(this.contentComponentMapping);
  //   for (const index in keys) {
  //     if (keys[index] === key) { this.currentContentComponentKeyIndex = Number(index); }
  //   }
  //   console.log(this.currentContentComponentKeyIndex);
  //   const dynamicComponentItem = new DynamicContentItem(this.contentComponentMapping[key], this.data);
  //   console.log(dynamicComponentItem);
  //   this.loadDynamicEntry(dynamicComponentItem);
  // }
}
