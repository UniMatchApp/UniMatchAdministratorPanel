import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Metrics, ReportType, Statistics} from '../application/services/UserService';
import {ReportedUser} from '../domain/models/ReportedUser';
import {User} from '../domain/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserController {
  private apiURL: string = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURL}/login`, { email, password });
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

  // Obtener usuarios por estado
  getUsersByStatus(status: string, limit: number = 10, offset: number = 0): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users/status`, { params: { status, limit: limit.toString(), offset: offset.toString() } });
  }

  // Obtener estadísticas
  getStadistics(): Observable<Statistics[]> {
    return this.http.get<Statistics[]>(`${this.apiURL}/statistics`);
  }

  // Obtener métricas
  getMetrics(): Observable<Metrics[]> {
    return this.http.get<Metrics[]>(`${this.apiURL}/metrics`);
  }

  // Obtener reportes de usuarios
  getReportsBy(reportType : ReportType = ReportType.All, limit: number = 10, offset: number = 0): Observable<ReportedUser[]> {
    return this.http.get<ReportedUser[]>(`${this.apiURL}/reports`, { params: { reportType, limit: limit.toString(), offset: offset.toString() } });
  }

  // Obtener el total de usuarios
  getTotalUsersNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/users/total`);
  }

  // Obtener el total de reportes
  getTotalReportsNumber(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/reports/total`);
  }

  // Cargar los reportes
  loadReports(): Observable<ReportedUser[]> {
    return this.http.get<ReportedUser[]>(`${this.apiURL}/reports`);
  }

  // Logout
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/logout`, {});
  }


}
