import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryEditLoaderComponent } from './entry-edit-loader.component';

describe('PartEntryComponent', () => {
  let component: EntryEditLoaderComponent;
  let fixture: ComponentFixture<EntryEditLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryEditLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryEditLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
