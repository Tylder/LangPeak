import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillBlankAddAltComponent } from './fill-blank-add-alt.component';

describe('FillBlankAddAltComponent', () => {
  let component: FillBlankAddAltComponent;
  let fixture: ComponentFixture<FillBlankAddAltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillBlankAddAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillBlankAddAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
