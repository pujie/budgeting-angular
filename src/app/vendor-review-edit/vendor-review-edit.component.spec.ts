import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorReviewEditComponent } from './vendor-review-edit.component';

describe('VendorReviewEditComponent', () => {
  let component: VendorReviewEditComponent;
  let fixture: ComponentFixture<VendorReviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorReviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorReviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
