import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Metrics, ReportType, Statistics} from '../application/services/UserService';
import {ReportedUser} from '../domain/models/ReportedUser';
import {User} from '../domain/models/User';

export interface UserDTO {
  id: string;
  email: string;
  registered: boolean;
  registrationDate: string;
  blockedUsers: string[];
  reportedUsers: string[];
}

export interface LoginDTO {
  User: UserDTO;
  Token: string;

}

@Injectable({
  providedIn: 'root'
})
export class UserController {
  private apiURL: string = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginDTO> {
    return this.http.post<{ value: { token: string, user: any } }>(
      `${this.apiURL}/auth/login`,
      { email, password }
    ).pipe(
      map(response => ({
        Token: response.value.token,
        User: {
          id: response.value.user.id,
          email: response.value.user.email,
          registered: response.value.user.registered,
          registrationDate: response.value.user.registrationDate,
          blockedUsers: response.value.user.blockedUsers || [],
          reportedUsers: response.value.user.reportedUsers || [],
        }
      }))
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/current`);
  }

  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`);
  }

  getUsersByName(name: string, limit: number = 10, offset: number = 0): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/search`, { params: { name, limit: limit.toString(), offset: offset.toString() } });
  }

  getUsersByStatus(status: string, limit: number = 10, offset: number = 0): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/status`, { params: { status, limit: limit.toString(), offset: offset.toString() } });
  }

  getStadistics(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(`${this.apiURL}/statistics`);
  }

  getMetrics(): Observable<Metrics[]> {
    return this.http.get<Metrics[]>(`${this.apiURL}/metrics`);
  }

  getReportsBy(reportType : ReportType = ReportType.All, limit: number = 10, offset: number = 0): Observable<ReportedUser[]> {
    return this.http.get<ReportedUser[]>(`${this.apiURL}/reports`, { params: { reportType, limit: limit.toString(), offset: offset.toString() } });
  }

  getTotalUsersNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/users/total`);
  }

  getTotalReportsNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/reports/total`);
  }

  loadReports(): Observable<ReportedUser[]> {
    return this.http.get<ReportedUser[]>(`${this.apiURL}/reports`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/logout`, {});
  }


}
