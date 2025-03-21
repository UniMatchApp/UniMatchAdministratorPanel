import {Component, Input} from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';
import {MockUserService} from '../../../../../data/infrastructure/services/user/MockUserService';

@Component({
  selector: 'app-dashboard-metrics',
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './dashboard-metrics.component.html',
  standalone: true,
  styleUrl: './dashboard-metrics.component.css'
})
export class DashboardMetricsComponent {
  colors = ['#FFC800', '#00EEFF', '#FF0000', '#0015FF'];
  @Input() metrics: any[] = [];

  constructor() {}


}
