import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinTest2Component } from './mixin-test2.component';

describe('MixinTest2Component', () => {
  let component: MixinTest2Component;
  let fixture: ComponentFixture<MixinTest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixinTest2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixinTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
