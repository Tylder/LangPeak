import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlanksGroupComponent } from './fill-blanks-group.component';

describe('FillBlanksComponent', () => {
  let component: FillBlanksGroupComponent;
  let fixture: ComponentFixture<FillBlanksGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlanksGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlanksGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
