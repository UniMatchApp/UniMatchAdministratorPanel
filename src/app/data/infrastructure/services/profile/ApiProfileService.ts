import {Profile} from '../../../domain/models/Profile';
import {ProfileInfo, ProfileService} from '../../../application/services/ProfileService';
import {UserController} from '../../../controller/UserController';
import {ProfileController} from '../../../controller/ProfileController';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

export class ApiProfileService extends ProfileService{


  private profileController: ProfileController;

  constructor(private http: HttpClient) {
    super();
    this.profileController = new ProfileController(this.http);
  }

  async getProfileInfo(userId: string): Promise<ProfileInfo> {
    try {
      const response = await firstValueFrom(this.profileController.getProfileInfo(userId));
      return new ProfileInfo(
        response.id,
        response.name,
        response.email,
        response.avatar
      );
    } catch (error) {
      console.error('Error en getProfileInfo:', error);
      throw new Error('Error al obtener la información del perfil');
    }
  }

  async getProfile(userId: string): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
}
