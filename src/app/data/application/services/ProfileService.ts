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
  avatar: string;
  selected: boolean = false;

  constructor(
    id: string,
    email: string,
    name: string = "User",
    avatar: string = "/assets/img/blank-profile-picture-973460_1280.webp"
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.avatar = avatar;
  }
}

