import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlankValidComponent } from './fill-blank-valid.component';

describe('FillBlankValidComponent', () => {
  let component: FillBlankValidComponent;
  let fixture: ComponentFixture<FillBlankValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlankValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlankValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
