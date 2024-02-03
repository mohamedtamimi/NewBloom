import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionheaderComponent } from './regionheader.component';

describe('RegionheaderComponent', () => {
  let component: RegionheaderComponent;
  let fixture: ComponentFixture<RegionheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
