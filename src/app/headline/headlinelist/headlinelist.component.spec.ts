import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlinelistComponent } from './headlinelist.component';

describe('HeadlinelistComponent', () => {
  let component: HeadlinelistComponent;
  let fixture: ComponentFixture<HeadlinelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadlinelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlinelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
