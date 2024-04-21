import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionInfoComponent } from './submission-info.component';

describe('SubmissionInfoComponent', () => {
  let component: SubmissionInfoComponent;
  let fixture: ComponentFixture<SubmissionInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
