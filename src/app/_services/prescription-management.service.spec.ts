import { TestBed } from '@angular/core/testing';

import { PrescriptionManagementService } from './prescription-management.service';

describe('PrescriptionManagementService', () => {
  let service: PrescriptionManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrescriptionManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
