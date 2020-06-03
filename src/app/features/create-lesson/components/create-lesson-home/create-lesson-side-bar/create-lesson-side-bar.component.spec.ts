import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessonSideBarComponent } from './create-lesson-side-bar.component';

describe('CreateLessonSideBarComponent', () => {
  let component: CreateLessonSideBarComponent;
  let fixture: ComponentFixture<CreateLessonSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLessonSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLessonSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
