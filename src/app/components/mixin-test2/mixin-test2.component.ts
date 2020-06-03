import { Component, OnInit } from '@angular/core';
import {Constructor} from '@angular/material/core/common-behaviors/constructor';
import {Observable} from 'rxjs';
import {Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

function mixin2<T extends Constructor<{}>>(Base: T) {

  return class extends Base  {

    isMobile$: Observable<boolean>;

    printValue() {
      console.log('VALUE 2');
    }
  };
}
const mixingBase = mixin2(class {});

@Component({
  selector: 'app-mixin-test2',
  templateUrl: './mixin-test2.component.html',
  styleUrls: ['./mixin-test2.component.scss']
})
export class MixinTest2Component extends mixingBase implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.printValue();
  }

}
