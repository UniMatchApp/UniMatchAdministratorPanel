import {Profile} from '../../domain/models/Profile';

export interface ProfileService {
  getProfileInfo(userId: string): Promise<ProfileInfo>;
  getProfile(userId: string): Promise<Profile>;
}

export class ProfileInfo {
  id: string;
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
