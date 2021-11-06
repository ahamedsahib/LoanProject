import { TestBed } from '@angular/core/testing';

import { PropertyserviceService } from './propertyservice.service';

describe('PropertyserviceService', () => {
  let service: PropertyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
