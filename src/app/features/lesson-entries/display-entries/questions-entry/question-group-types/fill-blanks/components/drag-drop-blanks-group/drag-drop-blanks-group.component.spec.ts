import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropBlanksGroupComponent } from './drag-drop-blanks-group.component';

describe('DragDropGroupComponent', () => {
  let component: DragDropBlanksGroupComponent;
  let fixture: ComponentFixture<DragDropBlanksGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropBlanksGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropBlanksGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
