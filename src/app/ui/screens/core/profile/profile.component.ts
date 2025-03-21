import {Component, OnInit} from '@angular/core';
import {ReportsListComponent} from '../../../components/shared/reports-list/reports-list.component';
import {MockProfileService} from '../../../../data/infrastructure/services/profile/MockProfileService';
import {ActivatedRoute, Router} from '@angular/router';
import {Profile} from '../../../../data/domain/models/Profile';

@Component({
  selector: 'app-profile',
  imports: [
    ReportsListComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null;

  constructor(
    private profileService: MockProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const userId = params['id'];

      if (userId) {
        this.profileService.getProfile(userId).then(
          (profileData) => {
            this.profile = profileData;
          },
          (error) => {
            console.error('Error al obtener el perfil:', error);
          }
        );
      } else {
        console.warn('No se proporcionó un ID de usuario en los parámetros de la URL.');
      }
    });
  }
}
