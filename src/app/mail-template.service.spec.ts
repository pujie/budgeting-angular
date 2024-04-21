import { TestBed, inject } from '@angular/core/testing';

import { MailTemplateService } from './mail-template.service';

describe('MailTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailTemplateService]
    });
  });

  it('should be created', inject([MailTemplateService], (service: MailTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
