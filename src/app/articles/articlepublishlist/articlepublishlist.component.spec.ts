import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlepublishlistComponent } from './articlepublishlist.component';

describe('ArticlepublishlistComponent', () => {
  let component: ArticlepublishlistComponent;
  let fixture: ComponentFixture<ArticlepublishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlepublishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlepublishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
