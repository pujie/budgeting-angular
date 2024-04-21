import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceivedComponent } from './goods-received.component';

describe('GoodsReceivedComponent', () => {
  let component: GoodsReceivedComponent;
  let fixture: ComponentFixture<GoodsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
