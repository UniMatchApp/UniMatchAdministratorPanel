import {Component, OnInit} from '@angular/core';
import {ReportsListComponent} from '../../../components/shared/reports-list/reports-list.component';
import {ProfileDetailsComponent} from '../../../components/core/profile/profile-details/profile-details.component'
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../../../data/domain/models/Profile';
import {ReportRow} from '../reports/reports.component';
import {ReportedUser} from '../../../../data/domain/models/ReportedUser';
import {ProfileService} from '../../../../data/application/services/ProfileService';
import {ReportType, UserService} from '../../../../data/application/services/UserService';

@Component({
  selector: 'app-profile',
  imports: [
    ReportsListComponent,
    ProfileDetailsComponent
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;
  reportRows: ReportRow[] = [];
  reports: ReportedUser[] = [];

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      const userId = params['id'];

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
      const reports = await this.userService.getReportsBy(ReportType.All, 0, 10);
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
