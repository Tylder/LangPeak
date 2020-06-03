import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartEditorRightSideBarComponent } from './part-editor-right-side-bar.component';

describe('PartEditorSideBarComponent', () => {
  let component: PartEditorRightSideBarComponent;
  let fixture: ComponentFixture<PartEditorRightSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartEditorRightSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartEditorRightSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
