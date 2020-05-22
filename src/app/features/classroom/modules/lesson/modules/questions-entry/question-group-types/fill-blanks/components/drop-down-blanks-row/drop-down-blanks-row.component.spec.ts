import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownBlanksRowComponent } from './drop-down-blanks-row.component';

describe('DropDownBlanksRowComponent', () => {
  let component: DropDownBlanksRowComponent;
  let fixture: ComponentFixture<DropDownBlanksRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownBlanksRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownBlanksRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
