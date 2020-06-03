import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MixinTestComponent } from './mixin-test.component';

describe('MixinTestComponent', () => {
  let component: MixinTestComponent;
  let fixture: ComponentFixture<MixinTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixinTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MixinTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
