import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadiSubmissionsComponent } from './padi-submissions.component';

describe('PadiSubmissionsComponent', () => {
  let component: PadiSubmissionsComponent;
  let fixture: ComponentFixture<PadiSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadiSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadiSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
