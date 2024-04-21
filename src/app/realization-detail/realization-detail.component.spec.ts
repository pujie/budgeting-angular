import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizationDetailComponent } from './realization-detail.component';

describe('RealizationDetailComponent', () => {
  let component: RealizationDetailComponent;
  let fixture: ComponentFixture<RealizationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
