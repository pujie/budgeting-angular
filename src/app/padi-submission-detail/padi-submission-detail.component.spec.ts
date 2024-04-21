import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadiSubmissionDetailComponent } from './padi-submission-detail.component';

describe('PadiSubmissionDetailComponent', () => {
  let component: PadiSubmissionDetailComponent;
  let fixture: ComponentFixture<PadiSubmissionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadiSubmissionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadiSubmissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
