import { TestBed } from '@angular/core/testing';

import { NlmDataService } from './nlm-data.service';

describe('NlmDataService', () => {
  let service: NlmDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NlmDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
