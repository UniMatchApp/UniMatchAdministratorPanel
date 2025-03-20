import { Component } from '@angular/core';
import {ReportsFiltersComponent} from '../../../components/core/reports/reports-filters/reports-filters.component';
import {ReportsListComponent} from '../../../components/shared/reports-list/reports-list.component';

@Component({
  selector: 'app-reports',
  imports: [
    ReportsFiltersComponent,
    ReportsListComponent
  ],
  templateUrl: './reports.component.html',
  standalone: true,
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
