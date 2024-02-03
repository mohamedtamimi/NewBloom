import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsheaderComponent } from './newsheader.component';

describe('NewsheaderComponent', () => {
  let component: NewsheaderComponent;
  let fixture: ComponentFixture<NewsheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
