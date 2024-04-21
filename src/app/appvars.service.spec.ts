import { TestBed, inject } from '@angular/core/testing';

import { AppvarsService } from './appvars.service';

describe('AppvarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppvarsService]
    });
  });

  it('should be created', inject([AppvarsService], (service: AppvarsService) => {
    expect(service).toBeTruthy();
  }));
});
