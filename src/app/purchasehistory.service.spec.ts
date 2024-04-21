import { TestBed, inject } from '@angular/core/testing';

import { PurchasehistoryService } from './purchasehistory.service';

describe('PurchasehistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchasehistoryService]
    });
  });

  it('should be created', inject([PurchasehistoryService], (service: PurchasehistoryService) => {
    expect(service).toBeTruthy();
  }));
});
