import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ReportRow} from '../../../screens/core/reports/reports.component';

interface Report {
  userReporting: { name: string; email: string; avatar: string; id: string };
  userReported: { name: string; email: string; avatar: string; id: string };
  date: string;
  reason: string;
  explanation: string;
  details: string;
}

@Component({
  selector: 'app-reports-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './reports-list.component.html',
  standalone: true,
  styleUrl: './reports-list.component.css'
})
export class ReportsListComponent {

  @Input() reports: ReportRow[] = [];
}
