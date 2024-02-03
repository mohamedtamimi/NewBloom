import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryheaderComponent } from './categoryheader.component';

describe('CategoryheaderComponent', () => {
  let component: CategoryheaderComponent;
  let fixture: ComponentFixture<CategoryheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
