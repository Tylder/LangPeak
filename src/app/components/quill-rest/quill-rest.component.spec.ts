import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillRestComponent } from './quill-rest.component';

describe('QuillRestComponent', () => {
  let component: QuillRestComponent;
  let fixture: ComponentFixture<QuillRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuillRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
