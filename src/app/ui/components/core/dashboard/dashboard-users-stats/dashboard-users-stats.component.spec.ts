import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUsersStatsComponent } from './dashboard-users-stats.component';

describe('DashboardUsersStatsComponent', () => {
  let component: DashboardUsersStatsComponent;
  let fixture: ComponentFixture<DashboardUsersStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUsersStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardUsersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
