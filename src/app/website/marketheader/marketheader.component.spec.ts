import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketheaderComponent } from './marketheader.component';

describe('MarketheaderComponent', () => {
  let component: MarketheaderComponent;
  let fixture: ComponentFixture<MarketheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
