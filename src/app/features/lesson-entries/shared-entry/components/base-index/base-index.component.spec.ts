import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseIndexComponent } from './base-index.component';

describe('QuestionIndexComponent', () => {
  let component: BaseIndexComponent;
  let fixture: ComponentFixture<BaseIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
