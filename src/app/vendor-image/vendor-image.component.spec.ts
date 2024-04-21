import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorImageComponent } from './vendor-image.component';

describe('VendorImageComponent', () => {
  let component: VendorImageComponent;
  let fixture: ComponentFixture<VendorImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
