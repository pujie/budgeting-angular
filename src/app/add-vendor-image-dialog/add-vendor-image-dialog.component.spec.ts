import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorImageDialogComponent } from './add-vendor-image-dialog.component';

describe('AddVendorImageDialogComponent', () => {
  let component: AddVendorImageDialogComponent;
  let fixture: ComponentFixture<AddVendorImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVendorImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVendorImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
