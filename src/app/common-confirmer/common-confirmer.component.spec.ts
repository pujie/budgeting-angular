import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonConfirmerComponent } from './common-confirmer.component';

describe('CommonConfirmerComponent', () => {
  let component: CommonConfirmerComponent;
  let fixture: ComponentFixture<CommonConfirmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonConfirmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonConfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
