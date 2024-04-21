import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSaveComponent } from './vendor-save.component';

describe('VendorSaveComponent', () => {
  let component: VendorSaveComponent;
  let fixture: ComponentFixture<VendorSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
