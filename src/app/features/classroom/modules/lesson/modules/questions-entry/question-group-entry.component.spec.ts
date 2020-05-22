import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupEntryComponent } from './question-group-entry.component';

describe('QuestionGroupContainerComponent', () => {
  let component: QuestionGroupEntryComponent;
  let fixture: ComponentFixture<QuestionGroupEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
