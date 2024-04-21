import { TestBed, inject } from '@angular/core/testing';

import { PlafonsService } from './plafons.service';

describe('PlafonsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlafonsService]
    });
  });

  it('should be created', inject([PlafonsService], (service: PlafonsService) => {
    expect(service).toBeTruthy();
  }));
});
