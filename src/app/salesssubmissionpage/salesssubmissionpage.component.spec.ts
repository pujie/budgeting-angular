import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesssubmissionpageComponent } from './salesssubmissionpage.component';

describe('SalesssubmissionpageComponent', () => {
  let component: SalesssubmissionpageComponent;
  let fixture: ComponentFixture<SalesssubmissionpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesssubmissionpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesssubmissionpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
