import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizationUpdateComponent } from './realization-update.component';

describe('RealizationUpdateComponent', () => {
  let component: RealizationUpdateComponent;
  let fixture: ComponentFixture<RealizationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
