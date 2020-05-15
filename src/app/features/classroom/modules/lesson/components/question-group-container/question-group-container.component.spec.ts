import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupContainerComponent } from './question-group-container.component';

describe('QuestionGroupContainerComponent', () => {
  let component: QuestionGroupContainerComponent;
  let fixture: ComponentFixture<QuestionGroupContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
