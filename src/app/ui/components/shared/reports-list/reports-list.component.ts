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

  IsoStringToString(date: string): string {
    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const [day, month, year] = formattedDate.split('/');
    return `${day}/${month}/${year}`;
  }
}
