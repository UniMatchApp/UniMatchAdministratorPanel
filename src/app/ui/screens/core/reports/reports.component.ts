import {Component, OnInit} from '@angular/core';
import { ReportsFiltersComponent } from '../../../components/core/reports/reports-filters/reports-filters.component';
import { ReportsListComponent } from '../../../components/shared/reports-list/reports-list.component';
import { MockUserService } from '../../../../data/infrastructure/services/user/MockUserService';
import { ReportedUser } from '../../../../data/domain/models/ReportedUser';
import {ProfileInfo, ProfileService} from '../../../../data/application/services/ProfileService';
import { MockProfileService } from '../../../../data/infrastructure/services/profile/MockProfileService';
import {ReportType, UserService} from '../../../../data/application/services/UserService';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Status} from '../users/users.component';

@Component({
  selector: 'app-reports',
  imports: [
    ReportsFiltersComponent,
    ReportsListComponent,
    FaIconComponent
  ],
  templateUrl: './reports.component.html',
  standalone: true,
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit{

  reportRows: ReportRow[] = [];

  currentPage: number = 1;
  pageSize: number = 8;
  totalReports: number = 0;
  selectedReportType: string = 'All';

  protected readonly faArrowRight = faArrowRight;
  protected readonly faArrowLeft = faArrowLeft;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
  ) {}

  async ngOnInit() {
    try {
      await this.userService.loadReports();
      await this.loadReports(this.currentPage);
      this.totalReports = await this.userService.getTotalReportsNumber();
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  }

  private parseReportTypeEnum(reportType: string) {
    return ReportType[reportType as keyof typeof ReportType] || ReportType.All;
  }

  async loadReports(page: number, reportType: string = 'All'): Promise<void> {
    const offset = (page - 1) * this.pageSize;
    try {
      const reportTypeEnum = this.parseReportTypeEnum(reportType)
      const reports = await this.userService.getReportsBy(reportTypeEnum, this.pageSize, offset);

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
      this.totalReports = await this.userService.getTotalReportsNumber();
    } catch (error) {
      console.error('Error al obtener los reportes:', error);
    }
  }

  onFilterTypeChanged(selectedType: string) {
    this.selectedReportType = selectedType;
    const parsedType = this.parseReportTypeEnum(selectedType);
    this.currentPage = 1;
    this.loadReports(this.currentPage, parsedType);

  }

  async nextPage()  {
    if ((this.currentPage * this.pageSize) < this.totalReports) {
      this.currentPage++;
      await this.loadReports(this.currentPage);
    }
  }

  async previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      await this.loadReports(this.currentPage);
    }
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalReports / this.pageSize));
  }
}

export interface ReportRow {
  reportedUser: ProfileInfo;
  report: ReportedUser;
  reportingUser: ProfileInfo;
}

