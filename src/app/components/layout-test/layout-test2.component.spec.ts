import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTest2Component } from './layout-test2.component';

describe('LayoutTestComponent', () => {
  let component: LayoutTest2Component;
  let fixture: ComponentFixture<LayoutTest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutTest2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
