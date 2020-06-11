import { TestBed } from '@angular/core/testing';

import { DebounceFormService } from './debounce-form.service';

describe('DebounceFormService', () => {
  let service: DebounceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebounceFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
