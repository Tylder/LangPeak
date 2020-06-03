import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownBlanksInputComponent } from './drop-down-blanks-input.component';

describe('DropDownBlanksInputComponent', () => {
  let component: DropDownBlanksInputComponent;
  let fixture: ComponentFixture<DropDownBlanksInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownBlanksInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownBlanksInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
