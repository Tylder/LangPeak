import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartEditorLeftSidebarComponent } from './part-editor-left-sidebar.component';

describe('PartEditorLeftSidebarComponent', () => {
  let component: PartEditorLeftSidebarComponent;
  let fixture: ComponentFixture<PartEditorLeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartEditorLeftSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartEditorLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
