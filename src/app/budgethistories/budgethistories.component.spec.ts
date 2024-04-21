import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgethistoriesComponent } from './budgethistories.component';

describe('BudgethistoriesComponent', () => {
  let component: BudgethistoriesComponent;
  let fixture: ComponentFixture<BudgethistoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgethistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgethistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
