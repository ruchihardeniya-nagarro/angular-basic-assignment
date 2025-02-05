import { TestBed } from '@angular/core/testing';

import { ApartmentDetailService } from './apartment-detail.service';

describe('ApartmentDetailService', () => {
  let service: ApartmentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
