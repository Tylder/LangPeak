import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {mixinLoadDynamicEntry} from '../../../../../../../../shared/mixins/load-dynamic-entry';
import {LessonPartEntry} from '../../../../../../../../shared/models/lesson';
import {QuestionGroupEntryFillBlanksComponent} from '../../../../../../../lesson-entries/display-entries/questions-entry/question-group-entry-fill-blanks.component';
import {TextEntryComponent} from '../../../../../../../lesson-entries/display-entries/text-entry/text-entry.component';
import {Lesson2Service} from '../../../../../../../../shared/services/lesson2.service';
import {TextEntryEditModule} from '../../../../../../../lesson-entries/edit-entries/text-entry-edit/text-entry-edit.module';
import {TextEntryEditComponent} from '../../../../../../../lesson-entries/edit-entries/text-entry-edit/text-entry-edit.component';
import {QuestionGroupEntryFillBlanksEditComponent} from '../../../../../../../lesson-entries/edit-entries/questions-entry-fill-blanks-edit/question-group-entry-fill-blanks-edit.component';


class BaseClass {
  constructor(public componentFactoryResolver: ComponentFactoryResolver) {
  }
}

const mixinBase = mixinLoadDynamicEntry(BaseClass);

@Component({
  selector: 'app-entry-view-loader',
  templateUrl: './entry-view-loader.component.html',
  styleUrls: ['./entry-view-loader.component.scss']
})
export class EntryViewLoaderComponent extends mixinBase implements OnInit {
  /**
   * This is a generic component which dynamically loads an entry depending on the data its given
   */

  @Input() data: LessonPartEntry;
  @Output() selectedId = new EventEmitter<string>();

  contentComponentMapping = {
    fillBlanks: QuestionGroupEntryFillBlanksComponent,
    text: TextEntryComponent,
  };

  constructor(public componentFactoryResolver: ComponentFactoryResolver,
              private lessonService: Lesson2Service, ) {
    super(componentFactoryResolver);
  }

  ngOnInit(): void {
    console.log('loader', this.data);

    this.loadDynamicEntryByKey(this.data.type);

    console.log(this.data);
  }

  // deleteEntry() {
  //
  //   this.lessonService.deleteDocByPath(this.data.path).subscribe();
  // }

  selected() {
    this.selectedId.emit(this.data.id);
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
