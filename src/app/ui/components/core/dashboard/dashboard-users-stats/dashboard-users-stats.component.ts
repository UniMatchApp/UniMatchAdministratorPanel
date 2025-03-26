import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Statistics} from '../../../../../data/application/services/UserService';

@Component({
  selector: 'app-dashboard-users-stats',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './dashboard-users-stats.component.html',
  standalone: true,
  styleUrl: './dashboard-users-stats.component.css'
})
export class DashboardUsersStatsComponent {

  @Input() statistic: Statistics | undefined;

  constructor() {
  }

}
