import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizationStaffComponent } from './realization-staff.component';

describe('RealizationStaffComponent', () => {
  let component: RealizationStaffComponent;
  let fixture: ComponentFixture<RealizationStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizationStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizationStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
