import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlankEditTextComponent } from './fill-blank-edit-text.component';

describe('FillBlankEditTextComponent', () => {
  let component: FillBlankEditTextComponent;
  let fixture: ComponentFixture<FillBlankEditTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlankEditTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlankEditTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
