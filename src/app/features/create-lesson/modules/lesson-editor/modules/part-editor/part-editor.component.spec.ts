import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartEditorComponent } from './part-editor.component';

describe('PartEditorComponent', () => {
  let component: PartEditorComponent;
  let fixture: ComponentFixture<PartEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
