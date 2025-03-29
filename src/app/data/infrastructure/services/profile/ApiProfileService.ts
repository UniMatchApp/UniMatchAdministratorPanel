import {Profile} from '../../../domain/models/Profile';
import {ProfileInfo, ProfileService} from '../../../application/services/ProfileService';
import {UserController} from '../../../controller/UserController';

export class ApiProfileService extends ProfileService{

  constructor(private userController: UserController) {
    super();
  }
  async getProfileInfo(userId: string): Promise<ProfileInfo> {
    throw new Error('Method not implemented.');
  }

  async getProfile(userId: string): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
}
