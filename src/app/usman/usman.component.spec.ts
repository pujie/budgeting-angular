import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsmanComponent } from './usman.component';

describe('UsmanComponent', () => {
  let component: UsmanComponent;
  let fixture: ComponentFixture<UsmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
