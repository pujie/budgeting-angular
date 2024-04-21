import { TestBed, inject } from '@angular/core/testing';

import { UsmanService } from './usman.service';

describe('UsmanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsmanService]
    });
  });

  it('should be created', inject([UsmanService], (service: UsmanService) => {
    expect(service).toBeTruthy();
  }));
});
