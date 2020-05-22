import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetQuestionsComponent } from './add-set-questions.component';

describe('AddSetQuestionsComponent', () => {
  let component: AddSetQuestionsComponent;
  let fixture: ComponentFixture<AddSetQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSetQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSetQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
