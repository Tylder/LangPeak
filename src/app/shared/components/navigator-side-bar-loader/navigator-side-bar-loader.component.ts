import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {mixinLoadDynamicEntry} from '../../mixins/load-dynamic-entry';
import {LeftSidebarContentService} from '../../services/left-sidebar-content.service';

class BaseClass {
  constructor(public componentFactoryResolver: ComponentFactoryResolver) {}
}

const mixinBase = mixinLoadDynamicEntry(BaseClass);

@Component({
  selector: 'app-navigator-side-bar-loader',
  templateUrl: './navigator-side-bar-loader.component.html',
  styleUrls: ['./navigator-side-bar-loader.component.scss']
})
export class NavigatorSideBarLoaderComponent extends mixinBase implements OnInit {

  constructor(private leftSidebarContentService: LeftSidebarContentService,
              public componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);


  }

  ngOnInit(): void {
    this.leftSidebarContentService.currentDynamicComponentItem$.subscribe(item => {
      console.log(item);
      this.loadDynamicEntry(item);
    });
  }
}
