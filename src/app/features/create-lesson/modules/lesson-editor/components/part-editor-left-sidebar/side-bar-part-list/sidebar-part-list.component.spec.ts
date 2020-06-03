import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPartListComponent } from './sidebar-part-list.component';

describe('PartListSideBarComponent', () => {
  let component: SidebarPartListComponent;
  let fixture: ComponentFixture<SidebarPartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPartListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
