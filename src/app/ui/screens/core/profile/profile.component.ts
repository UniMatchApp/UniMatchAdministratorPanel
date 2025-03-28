import {Component, OnInit} from '@angular/core';
import {ReportsListComponent} from '../../../components/shared/reports-list/reports-list.component';
import {ProfileDetailsComponent} from '../../../components/core/profile/profile-details/profile-details.component'
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../../../data/domain/models/Profile';
import {ReportRow} from '../reports/reports.component';
import {ReportedUser} from '../../../../data/domain/models/ReportedUser';
import {ProfileService} from '../../../../data/application/services/ProfileService';
import {ReportType, UserService} from '../../../../data/application/services/UserService';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-profile',
  imports: [
    ReportsListComponent,
    ProfileDetailsComponent,
    FaIconComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: Profile | undefined;

  reportRows: ReportRow[] = [];
  reports: ReportedUser[] = [];

  currentPage: number = 1;
  pageSize: number = 5;
  totalReports: number = 0;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      const userId =  this.route.snapshot.paramMap.get('id');
      if (userId) {
        try {
          this.profile = await this.profileService.getProfile(userId);
        } catch (error) {
          console.error('Error al obtener el perfil:', error);
        }
      } else {
        console.warn('No se proporcionó un ID de usuario en los parámetros de la URL.');
      }
    });

    try {
      await this.userService.loadReports();
      await this.loadReports(this.currentPage);
      const reports = await this.userService.getReportsBy(ReportType.All, this.pageSize, (this.currentPage-1)*this.pageSize);
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

  protected readonly faArrowRight = faArrowRight;
  protected readonly faArrowLeft = faArrowLeft;

}
