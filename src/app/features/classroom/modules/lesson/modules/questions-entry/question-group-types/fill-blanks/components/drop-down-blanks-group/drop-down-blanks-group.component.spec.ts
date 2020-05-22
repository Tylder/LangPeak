import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownBlanksGroupComponent } from './drop-down-blanks-group.component';

describe('DropDownBlanksGroupComponent', () => {
  let component: DropDownBlanksGroupComponent;
  let fixture: ComponentFixture<DropDownBlanksGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownBlanksGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownBlanksGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
