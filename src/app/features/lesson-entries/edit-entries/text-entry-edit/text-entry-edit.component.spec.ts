import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEntryEditComponent } from './text-entry-edit.component';

describe('TextEntryComponent', () => {
  let component: TextEntryEditComponent;
  let fixture: ComponentFixture<TextEntryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEntryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
