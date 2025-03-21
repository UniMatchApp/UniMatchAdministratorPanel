import { Component, OnInit } from '@angular/core';
import {
  DashboardMetricsComponent
} from '../../../components/core/dashboard/dashboard-metrics/dashboard-metrics.component';
import {
  DashboardUsersStatsComponent
} from '../../../components/core/dashboard/dashboard-users-stats/dashboard-users-stats.component';
import {NgForOf} from '@angular/common';
import {MockUserService} from '../../../../data/infrastructure/services/user/MockUserService';
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
  protected stats: any[] = [];
  protected metrics: any[] = [];

  constructor(private userService: MockUserService) {}

  async ngOnInit() {
    this.stats = await this.userService.getStadistics();
    this.metrics = await this.userService.getMetrics();
  }

}
