import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsbycategoryComponent } from './newsbycategory.component';

describe('NewsbycategoryComponent', () => {
  let component: NewsbycategoryComponent;
  let fixture: ComponentFixture<NewsbycategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsbycategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsbycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
