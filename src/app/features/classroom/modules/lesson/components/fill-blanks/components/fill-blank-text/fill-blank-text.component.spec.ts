import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlankTextComponent } from './fill-blank-text.component';

describe('FillBlankTextComponent', () => {
  let component: FillBlankTextComponent;
  let fixture: ComponentFixture<FillBlankTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlankTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlankTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
