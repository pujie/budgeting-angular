import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalessubmissioneditComponent } from './salessubmissionedit.component';

describe('SalessubmissioneditComponent', () => {
  let component: SalessubmissioneditComponent;
  let fixture: ComponentFixture<SalessubmissioneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalessubmissioneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalessubmissioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
