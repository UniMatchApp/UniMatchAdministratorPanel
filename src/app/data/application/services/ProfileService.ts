import {Profile} from '../../domain/models/Profile';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ProfileService {
  abstract getProfileInfo(userId: string): Promise<ProfileInfo>;
  abstract getProfile(userId: string): Promise<Profile>;
}

export class ProfileInfo {
  id: string;
  name: string;

  email: string;
  avatar: string

  constructor(id: string, name: string, email: string, avatar: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}
