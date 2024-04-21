import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestgetvendorComponent } from './testgetvendor.component';

describe('TestgetvendorComponent', () => {
  let component: TestgetvendorComponent;
  let fixture: ComponentFixture<TestgetvendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestgetvendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestgetvendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
