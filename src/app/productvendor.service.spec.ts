import { TestBed, inject } from '@angular/core/testing';

import { ProductvendorService } from './productvendor.service';

describe('ProductvendorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductvendorService]
    });
  });

  it('should be created', inject([ProductvendorService], (service: ProductvendorService) => {
    expect(service).toBeTruthy();
  }));
});
