import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonInfoEditorComponent } from './lesson-info-editor.component';

describe('LessonEditorComponent', () => {
  let component: LessonInfoEditorComponent;
  let fixture: ComponentFixture<LessonInfoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonInfoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonInfoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
