import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import {Constructor} from '@angular/material/core/common-behaviors/constructor';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {
  DynamicContentComponent,
  DynamicContentItem,
  HasComponentFactoryResolver,
  mixinLoadDynamicEntry
} from '../../shared/mixins/load-dynamic-entry';
import {DynamicContentDirective} from '../../shared/directives/dynamic-content.directive';


interface HasBreakpointObserver {
  breakpointObserver: BreakpointObserver;
}


function mixin1<T extends Constructor<HasBreakpointObserver>>(Base: T) {

  return class extends Base  {

    isMobile$: Observable<boolean>;

    constructor(...args: any[]) {
      super(...args);

      console.log('CONSTRUCTOR');

      this.isMobile$ = this.breakpointObserver.observe([Breakpoints.XSmall]).pipe(
        map(result => result.matches)
      );
      this.isMobile$.subscribe(val => console.log(val));
    }
    printValue() {
      console.log('VALUE');
    }
  };
}

function mixin2<T extends Constructor<{}>>(Base: T) {

  return class extends Base  {

    printStuff() {
      console.log('STUFF');
    }
  };
}



class BaseClass {
  constructor(public breakpointObserver: BreakpointObserver,
              public componentFactoryResolver: ComponentFactoryResolver) {
  }
}


const mixingBase = mixinLoadDynamicEntry(mixin2(mixin1(BaseClass)));


@Component({
  selector: 'app-mixin-test',
  templateUrl: './mixin-test.component.html',
  styleUrls: ['./mixin-test.component.scss']
})
export class MixinTestComponent extends mixingBase implements OnInit {

  constructor(public breakpointObserver: BreakpointObserver,
              public componentFactoryResolver: ComponentFactoryResolver) {
    super(breakpointObserver, componentFactoryResolver);
  }

  ngOnInit(): void {
    this.isMobile$.subscribe();
    this.printValue();
    this.printStuff();
  }



}

