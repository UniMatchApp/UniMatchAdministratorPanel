import {Component, Input} from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';
import {MockUserService} from '../../../../../data/infrastructure/services/user/MockUserService';
import {Metrics} from '../../../../../data/application/services/UserService';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-dashboard-metrics',
  imports: [
    NgForOf,
    NgStyle,
  ],
  templateUrl: './dashboard-metrics.component.html',
  standalone: true,
  styleUrl: './dashboard-metrics.component.css'
})
export class DashboardMetricsComponent {

  protected readonly faArrowUp = faArrowUp;
  protected readonly faArrowDown = faArrowDown;
  colors = ['#FFC800', '#00EEFF', '#FF0000', '#0015FF'];

  @Input() metrics: Metrics[] = [];

  constructor() {}

}
