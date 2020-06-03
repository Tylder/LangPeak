import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatorSideBarLoaderComponent } from './navigator-side-bar-loader.component';

describe('NavigatorBarComponent', () => {
  let component: NavigatorSideBarLoaderComponent;
  let fixture: ComponentFixture<NavigatorSideBarLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatorSideBarLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatorSideBarLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
