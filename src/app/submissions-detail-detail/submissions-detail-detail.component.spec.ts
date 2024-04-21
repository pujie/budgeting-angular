import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsDetailDetailComponent } from './submissions-detail-detail.component';

describe('SubmissionsDetailDetailComponent', () => {
  let component: SubmissionsDetailDetailComponent;
  let fixture: ComponentFixture<SubmissionsDetailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionsDetailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionsDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
