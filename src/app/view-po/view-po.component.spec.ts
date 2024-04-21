import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPOComponent } from './view-po.component';

describe('ViewPOComponent', () => {
  let component: ViewPOComponent;
  let fixture: ComponentFixture<ViewPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
