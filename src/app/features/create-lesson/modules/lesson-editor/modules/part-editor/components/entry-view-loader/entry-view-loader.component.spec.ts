import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryViewLoaderComponent } from './entry-view-loader.component';

describe('PartEntryComponent', () => {
  let component: EntryViewLoaderComponent;
  let fixture: ComponentFixture<EntryViewLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryViewLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryViewLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
