import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsbyregionComponent } from './newsbyregion.component';

describe('NewsbyregionComponent', () => {
  let component: NewsbyregionComponent;
  let fixture: ComponentFixture<NewsbyregionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsbyregionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsbyregionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
