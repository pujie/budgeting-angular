import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectDescriptionDialogComponent } from './reject-description-dialog.component';

describe('RejectDescriptionDialogComponent', () => {
  let component: RejectDescriptionDialogComponent;
  let fixture: ComponentFixture<RejectDescriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectDescriptionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
