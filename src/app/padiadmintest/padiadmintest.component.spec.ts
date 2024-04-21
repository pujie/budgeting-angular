import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadiadmintestComponent } from './padiadmintest.component';

describe('PadiadmintestComponent', () => {
  let component: PadiadmintestComponent;
  let fixture: ComponentFixture<PadiadmintestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadiadmintestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadiadmintestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
