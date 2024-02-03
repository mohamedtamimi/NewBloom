import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakingNewsHeaderComponent } from './breaking-news-header.component';

describe('BreakingNewsHeaderComponent', () => {
  let component: BreakingNewsHeaderComponent;
  let fixture: ComponentFixture<BreakingNewsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakingNewsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakingNewsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
