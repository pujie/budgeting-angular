import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorUpdateComponent } from './vendor-udpate.component';

describe('VendorUpdateComponent', () => {
  let component: VendorUpdateComponent;
  let fixture: ComponentFixture<VendorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
