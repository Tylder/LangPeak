import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartEntryComponent } from './part-entry.component';

describe('PartEntryComponent', () => {
  let component: PartEntryComponent;
  let fixture: ComponentFixture<PartEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
