import { TestBed, inject } from '@angular/core/testing';

import { BudgethistoryService } from './budgethistory.service';

describe('BudgethistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgethistoryService]
    });
  });

  it('should be created', inject([BudgethistoryService], (service: BudgethistoryService) => {
    expect(service).toBeTruthy();
  }));
});
