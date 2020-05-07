import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtcTest2Component } from './rtc-test2.component';

describe('RtcTest2Component', () => {
  let component: RtcTest2Component;
  let fixture: ComponentFixture<RtcTest2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtcTest2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtcTest2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
