import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlinepublishComponent } from './headlinepublish.component';

describe('HeadlinepublishComponent', () => {
  let component: HeadlinepublishComponent;
  let fixture: ComponentFixture<HeadlinepublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadlinepublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadlinepublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
