import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupEntryFillBlanksComponent } from './question-group-entry-fill-blanks.component';

describe('QuestionGroupContainerComponent', () => {
  let component: QuestionGroupEntryFillBlanksComponent;
  let fixture: ComponentFixture<QuestionGroupEntryFillBlanksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupEntryFillBlanksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupEntryFillBlanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
