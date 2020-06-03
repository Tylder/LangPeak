import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessonHomeComponent } from './create-lesson-home.component';

describe('MainComponent', () => {
  let component: CreateLessonHomeComponent;
  let fixture: ComponentFixture<CreateLessonHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLessonHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLessonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
