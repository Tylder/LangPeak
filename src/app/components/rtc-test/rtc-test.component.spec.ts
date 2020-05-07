import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtcTestComponent } from './rtc-test.component';

describe('RtcTestComponent', () => {
  let component: RtcTestComponent;
  let fixture: ComponentFixture<RtcTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtcTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtcTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
