import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlafonsComponent } from './plafons.component';

describe('PlafonsComponent', () => {
  let component: PlafonsComponent;
  let fixture: ComponentFixture<PlafonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlafonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlafonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
