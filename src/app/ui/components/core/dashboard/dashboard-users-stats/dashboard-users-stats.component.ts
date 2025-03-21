import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

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

  @Input() title!: string;
  @Input() image?: string;
  @Input() columns!: string[];
  @Input() table!: { stat: string; users: number; actives: number }[];

  constructor() {
  }

  ngOnInit() {
  }

}
