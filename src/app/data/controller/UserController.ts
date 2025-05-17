import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Metrics, ReportType, Statistics, Stats } from '../application/services/UserService';
import { ReportedUser } from '../domain/models/ReportedUser';
import { User } from '../domain/models/User';

// Function to capitalize words
function formatStatName(statName: string): string {
  return statName.replace(/_/g, ' ')
                 .split(' ')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter
                 .join(' ');
}

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
      `${this.apiURL}/auth/admin/login`,
      { email, password }
    ).pipe(
      map(response => {
        const token = response.value.token;
        sessionStorage.setItem('adminToken', token);
        return {
          Token: token,
          User: {
            id: response.value.user.id,
            email: response.value.user.email,
            registered: response.value.user.registered,
            registrationDate: response.value.user.registrationDate,
            blockedUsers: response.value.user.blockedUsers || [],
            reportedUsers: response.value.user.reportedUsers || [],
          }
        };
      })
    );
  }

  deleteUser(targetId: string): Observable<void> {
    const token = sessionStorage.getItem('adminToken');  // Retrieve the token from sessionStorage

    if (!token) {
      throw new Error('Admin token is missing');
    }

    return this.http.delete<void>(`${this.apiURL}/admin/${targetId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  validateSession(token: string): Observable<boolean> {
    return this.http.post<{ valid: boolean }>(
      `${this.apiURL}/auth`,
      { token }
    ).pipe(
      tap(response => console.log("Response", response)),
      map(response => response.valid)
    );
  }

  loadAllUsers(): Observable<UserDTO[]> {
    return this.http.get<{ value: UserDTO[] }>(`${this.apiURL}`).pipe(
      map((response) =>
        response.value.map(user => ({
          id: user.id,
          email: user.email,
          registered: user.registered,
          registrationDate: user.registrationDate,
          blockedUsers: user.blockedUsers || [],
          reportedUsers: user.reportedUsers || []
        }))
      )
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/current`);
  }

  getUsersByName(name: string, limit: number = 10, offset: number = 0): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/search`, { params: { name, limit: limit.toString(), offset: offset.toString() } });
  }

  getUsersByStatus(status: string, limit: number = 10, offset: number = 0): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/status`, { params: { status, limit: limit.toString(), offset: offset.toString() } });
  }

  getStadistics(): Observable<Statistics[]> {
    return this.http.get<StatisticsResponseDTO>(`${this.apiURL}/statistics`).pipe(
      map(response => {
        return response.value.map((rawStat: RawStatisticsDTO) => new Statistics(
          rawStat.title,
          rawStat.columns,
          rawStat.stats.map((s: RawStatsDTO) => new Stats(
            formatStatName(s.stat),
            s.total_users,
            s.active_users
          ))
        ));
      })
    );
  }

  getMetrics(): Observable<Metrics[]> {
    return this.http.get<Metrics[]>(`${this.apiURL}/metrics`);
  }

  getReportsBy(reportType: ReportType = ReportType.ALL, limit: number = 10, offset: number = 0): Observable<ReportedUser[]> {
    return this.http.get<ReportedUser[]>(`${this.apiURL}/reports`, { params: { reportType, limit: limit.toString(), offset: offset.toString() } });
  }

  getTotalUsersNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/users/total`);
  }

  getTotalReportsNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/reports/total`);
  }

  loadReports(): Observable<ReportedUserDto[]> {
    return this.http.get<{ value: ReportedUserDto[] }>(`${this.apiURL}/reports`).pipe(
      map((response) =>
        response.value.map(report => ({
          id: report.id,
          reportedUserId: report.reportedUserId,
          predefinedReason: report.predefinedReason,
          details: report.details,
          comment: report.comment || '',
          createdAt: report.createdAt
        }))
      )
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/logout`, {});
  }
}

export interface ReportedUserDto {
  id: string;
  reportedUserId: string;
  predefinedReason: string;
  details: string;
  comment?: string;
  createdAt: string;
}

export interface RawStatsDTO {
  stat: string;
  total_users: number;
  active_users: number;
}

export interface RawStatisticsDTO {
  title: string;
  columns: string[];
  stats: RawStatsDTO[];
}

export interface StatisticsResponseDTO {
  value: RawStatisticsDTO[];
  success: boolean;
  error: string | null;
}
