import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionRejectComponent } from './submission-reject.component';

describe('SubmissionRejectComponent', () => {
  let component: SubmissionRejectComponent;
  let fixture: ComponentFixture<SubmissionRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
