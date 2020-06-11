import {Component, ComponentFactoryResolver, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {mixinLoadDynamicEntry} from '../../../../../../../../shared/mixins/load-dynamic-entry';
import {LessonPartEntry} from '../../../../../../../../shared/models/lesson';
import {QuestionGroupEntryFillBlanksComponent} from '../../../../../../../lesson-entries/display-entries/questions-entry/question-group-entry-fill-blanks.component';
import {TextEntryComponent} from '../../../../../../../lesson-entries/display-entries/text-entry/text-entry.component';
import {Lesson2Service} from '../../../../../../../../shared/services/lesson2.service';
import {TextEntryEditModule} from '../../../../../../../lesson-entries/edit-entries/text-entry-edit/text-entry-edit.module';
import {TextEntryEditComponent} from '../../../../../../../lesson-entries/edit-entries/text-entry-edit/text-entry-edit.component';
import {QuestionGroupEntryFillBlanksEditComponent} from '../../../../../../../lesson-entries/edit-entries/questions-entry-fill-blanks-edit/question-group-entry-fill-blanks-edit.component';
import {Observable} from 'rxjs';


class BaseClass {
  constructor(public componentFactoryResolver: ComponentFactoryResolver) {
  }
}

const mixinBase = mixinLoadDynamicEntry(BaseClass);

@Component({
  selector: 'app-entry-edit-loader',
  templateUrl: './entry-edit-loader.component.html',
  styleUrls: ['./entry-edit-loader.component.scss']
})
export class EntryEditLoaderComponent extends mixinBase implements OnInit, OnChanges {
  /**
   * This is a generic component which dynamically loads an entry depending on the data its given
   */

  @Input() data: LessonPartEntry;
  @Output() exitEdit = new EventEmitter<any>();

  contentComponentMapping = {
    fillBlanks: QuestionGroupEntryFillBlanksEditComponent,
    text: TextEntryEditComponent,
  };

  constructor(public componentFactoryResolver: ComponentFactoryResolver,
              private lessonService: Lesson2Service, ) {
    super(componentFactoryResolver);
  }

  ngOnInit(): void {


    // this.test$.subscribe(val => console.log(val));

    // this.lessonService.listenfor

    console.log('loader', this.data);
    //
    //
    // if (this.data.type === 'fillBlanks') {
    //   this.lessonService.listenForEntryQuestions$(this.data.path)
    //     .subscribe((questions) => {
    //       // console.log(questions);
    //       // console.log(this.data);
    //       //
    //       // if (!('data' in this.data)) { this.data.data = {}; } //  add an empty data object if there is none
    //
    //       // this.data.data.questions = questions;
    //
    //       this.loadDynamicEntryByKey(this.data.type);
    //     }
    //   );
    // } else {
    this.loadDynamicEntryByKey(this.data.type);
    // }


    console.log(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  deleteEntry() {

    this.lessonService.deleteDocByPath(this.data.path).subscribe();
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
