import {Component, OnInit} from '@angular/core';
import { ReportsFiltersComponent } from '../../../components/core/reports/reports-filters/reports-filters.component';
import { ReportsListComponent } from '../../../components/shared/reports-list/reports-list.component';
import { MockUserService } from '../../../../data/infrastructure/services/user/MockUserService';
import { ReportedUser } from '../../../../data/domain/models/ReportedUser';
import { ProfileInfo } from '../../../../data/application/services/ProfileService';
import { MockProfileService } from '../../../../data/infrastructure/services/profile/MockProfileService';

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
export class ReportsComponent implements OnInit{

  reports: ReportedUser[] = [];
  reportRows: ReportRow[] = [];

  constructor(
    private userService: MockUserService,
    private profileService: MockProfileService
  ) {}

  async ngOnInit() {
    try {
      const reports = await this.userService.getReports();
      this.reports = reports;
      console.log('Reports:', reports);
      this.reportRows = await Promise.all(
        reports.map(async (report) => {
          const reportedUserProfile = await this.profileService.getProfileInfo(report.reportedUserId);
          const reportingUserProfile = await this.profileService.getProfileInfo(report.reportingUserId);

          return {
            reportedUser: reportedUserProfile,
            reportingUser: reportingUserProfile,
            report
          };
        })
      );

      console.log('ReportRows:', this.reportRows);
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  }
}

export interface ReportRow {
  reportedUser: ProfileInfo;
  report: ReportedUser;
  reportingUser: ProfileInfo;
}

