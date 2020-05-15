import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlanksRowComponent } from './fill-blanks-row.component';

describe('FillBlanksEntryComponent', () => {
  let component: FillBlanksRowComponent;
  let fixture: ComponentFixture<FillBlanksRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlanksRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlanksRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
