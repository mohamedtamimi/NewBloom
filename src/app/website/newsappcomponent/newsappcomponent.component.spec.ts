import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsappcomponentComponent } from './newsappcomponent.component';

describe('NewsappcomponentComponent', () => {
  let component: NewsappcomponentComponent;
  let fixture: ComponentFixture<NewsappcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsappcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsappcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
