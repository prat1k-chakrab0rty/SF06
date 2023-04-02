import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldStatsComponent } from './old-stats.component';

describe('OldStatsComponent', () => {
  let component: OldStatsComponent;
  let fixture: ComponentFixture<OldStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
