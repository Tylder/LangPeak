import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropBlanksRowComponent } from './drag-drop-blanks-row.component';

describe('DragDropBlanksRowComponent', () => {
  let component: DragDropBlanksRowComponent;
  let fixture: ComponentFixture<DragDropBlanksRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropBlanksRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropBlanksRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
