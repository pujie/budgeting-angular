import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSaveComponent } from './product-save.component';

describe('ProductSaveComponent', () => {
  let component: ProductSaveComponent;
  let fixture: ComponentFixture<ProductSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
