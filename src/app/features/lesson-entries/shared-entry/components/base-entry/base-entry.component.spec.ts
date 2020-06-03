import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEntryComponent } from './base-entry.component';

describe('BaseEntryComponent', () => {
  let component: BaseEntryComponent;
  let fixture: ComponentFixture<BaseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
