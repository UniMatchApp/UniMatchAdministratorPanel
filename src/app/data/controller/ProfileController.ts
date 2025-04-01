import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ProfileInfo} from '../application/services/ProfileService';
import {Profile} from '../domain/models/Profile';


export interface ProfileDTO {
  profileId: string;
  userId: string;
  name: string;
  age: number;
  aboutMe: string;
  location?: { latitude: number, longitude: number, altitude?: number };
  gender: string;
  sexualOrientation: string;
  relationshipType: string;
  birthday: Date;
  interests: string[];
  wall: string[];
  preferredImage: string;
  maxDistance: number;
  ageRange: { min: number, max: number}
  horoscope?: string;
  height?: number;
  weight?: number;
  job?: string;
  education?: string;
  personalityType?: string;
  pets?: string;
  drinks?: string;
  smokes?: string;
  doesSports?: string;
  valuesAndBeliefs?: string;
  genderPriority?: string;
  fact?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileController {
  private apiURL: string = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  getProfileInfo(userId: string): Observable<ProfileInfo> {
    return this.http.get<{ value: ProfileInfo }>(
      `${this.apiURL}/profile/${userId}/info`
    ).pipe(
      map(response =>
        response.value
      ));
  }

  getProfile(userId: string): Observable<ProfileDTO> {
    return this.http.get<{ value: ProfileDTO }>(
      `${this.apiURL}/${userId}`
    ).pipe(
      map(response =>
        response.value
      ));
  }
}
