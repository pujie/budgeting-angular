import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyproductimagesComponent } from './myproductimages.component';

describe('MyproductimagesComponent', () => {
  let component: MyproductimagesComponent;
  let fixture: ComponentFixture<MyproductimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyproductimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyproductimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
