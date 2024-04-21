import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMonthlyReportComponent } from './purchase-monthly-report.component';

describe('PurchaseMonthlyReportComponent', () => {
  let component: PurchaseMonthlyReportComponent;
  let fixture: ComponentFixture<PurchaseMonthlyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseMonthlyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseMonthlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
