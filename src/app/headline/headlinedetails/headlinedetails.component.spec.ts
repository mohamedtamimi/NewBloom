import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlinedetailsComponent } from './headlinedetails.component';

describe('HeadlinedetailsComponent', () => {
  let component: HeadlinedetailsComponent;
  let fixture: ComponentFixture<HeadlinedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadlinedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlinedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
