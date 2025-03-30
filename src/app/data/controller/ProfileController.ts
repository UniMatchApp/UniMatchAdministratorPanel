import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ProfileInfo} from '../application/services/ProfileService';
import {Profile} from '../domain/models/Profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileController {
  private apiURL: string = 'http://localhost:3000/api/v1/users/profile';

  constructor(private http: HttpClient) {}

  getProfileInfo(userId: string): Observable<ProfileInfo> {
    return this.http.get<{ value: ProfileInfo }>(
      `${this.apiURL}/${userId}/info`
    ).pipe(
      map(response =>
        response.value
      ));
  }

  getProfile(userId: string): Observable<Profile> {
    return this.http.get<{ value: Profile }>(
      `${this.apiURL}/${userId}`
    ).pipe(
      map(response => response.value)
    );
  }
}
