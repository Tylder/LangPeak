import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropBlanksInputComponent } from './drag-drop-blanks-input.component';

describe('DragDropBlanksInputComponent', () => {
  let component: DragDropBlanksInputComponent;
  let fixture: ComponentFixture<DragDropBlanksInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropBlanksInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropBlanksInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
