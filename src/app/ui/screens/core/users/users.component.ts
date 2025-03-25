import { Component } from '@angular/core';
import {
    DashboardMetricsComponent
} from "../../../components/core/dashboard/dashboard-metrics/dashboard-metrics.component";
import {
    DashboardUsersStatsComponent
} from "../../../components/core/dashboard/dashboard-users-stats/dashboard-users-stats.component";
import {NgForOf} from "@angular/common";
import {MockUserService} from '../../../../data/infrastructure/services/user/MockUserService';

@Component({
  selector: 'app-users',
  imports: [
      DashboardMetricsComponent,
      DashboardUsersStatsComponent,
      NgForOf
  ],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  protected metrics: any[] = [];

  constructor(private userService: MockUserService) {}

  async ngOnInit() {
    this.metrics = await this.userService.getMetrics();
  }
}
