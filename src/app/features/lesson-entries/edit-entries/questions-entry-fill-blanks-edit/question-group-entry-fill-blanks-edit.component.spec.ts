import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupEntryFillBlanksEditComponent } from './question-group-entry-fill-blanks-edit.component';

describe('QuestionGroupContainerComponent', () => {
  let component: QuestionGroupEntryFillBlanksEditComponent;
  let fixture: ComponentFixture<QuestionGroupEntryFillBlanksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupEntryFillBlanksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupEntryFillBlanksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
