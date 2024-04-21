import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySaveComponent } from './category-save.component';

describe('CategorySaveComponent', () => {
  let component: CategorySaveComponent;
  let fixture: ComponentFixture<CategorySaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
