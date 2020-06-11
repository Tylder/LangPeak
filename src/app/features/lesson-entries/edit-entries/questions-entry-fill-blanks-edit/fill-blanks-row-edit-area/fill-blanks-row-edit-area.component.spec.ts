import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlanksRowEditAreaComponent } from './fill-blanks-row-edit-area.component';

describe('QuestionItemEditComponent', () => {
  let component: FillBlanksRowEditAreaComponent;
  let fixture: ComponentFixture<FillBlanksRowEditAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlanksRowEditAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlanksRowEditAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
