import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionSaveComponent } from './submission-save.component';

describe('SubmissionSaveComponent', () => {
  let component: SubmissionSaveComponent;
  let fixture: ComponentFixture<SubmissionSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
