import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {DynamicContentItem, mixinLoadDynamicEntry} from '../mixins/load-dynamic-entry';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {CreateLessonHomeComponent} from '../../features/create-lesson/components/create-lesson-home/create-lesson-home.component';
import {CreateLessonSideBarComponent} from '../../features/create-lesson/components/create-lesson-home/create-lesson-side-bar/create-lesson-side-bar.component';

@Injectable({
  providedIn: 'root'
})
export class LeftSidebarContentService {

  currentDynamicComponentItem$: BehaviorSubject<DynamicContentItem>;

  constructor() {

    const defaultComponentItem = new DynamicContentItem(CreateLessonSideBarComponent, {});

    this.currentDynamicComponentItem$ = new BehaviorSubject<DynamicContentItem>(defaultComponentItem);
  }

}
