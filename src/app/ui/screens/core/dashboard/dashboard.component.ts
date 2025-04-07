import { Component, OnInit } from '@angular/core';
import {
  DashboardMetricsComponent
} from '../../../components/core/dashboard/dashboard-metrics/dashboard-metrics.component';
import {
  DashboardUsersStatsComponent
} from '../../../components/core/dashboard/dashboard-users-stats/dashboard-users-stats.component';
import {NgForOf} from '@angular/common';
import {MockUserService} from '../../../../data/infrastructure/services/user/MockUserService';
import {Metrics, Statistics, UserService} from '../../../../data/application/services/UserService';
import {MatchingService} from '../../../../data/application/services/MatchingService';
@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardMetricsComponent,
    DashboardUsersStatsComponent,
    NgForOf,
  ],
  providers: [
    {
      provide: MockUserService
    }
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  protected stats: Statistics[] = [];
  protected metrics: Metrics[] = [];

  constructor(
    private userService: UserService,
    private matchingService: MatchingService,
  ) {}

  async ngOnInit() {
    await this.userService.loadAllUsers();
    await this.userService.loadReports();

    const [stats, userMetrics, totalMatches] = await Promise.all([
      this.userService.getStadistics(),
      this.userService.getMetrics(),
      this.matchingService.getTotalMatchesNumber()
    ]);

    this.stats = stats;
    this.metrics = [
      ...userMetrics,
      new Metrics('Total matches', totalMatches)
    ];
  }


}
