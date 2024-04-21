import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizationProductComponent } from './realization-product.component';

describe('RealizationProductComponent', () => {
  let component: RealizationProductComponent;
  let fixture: ComponentFixture<RealizationProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizationProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
