import {Metrics, ReportType, Statistics, Stats, UserService} from '../../../application/services/UserService';
import {User} from '../../../domain/models/User';
import {ReportedUser} from '../../../domain/models/ReportedUser';
import {UserController} from '../../../controller/UserController';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Status} from '../../../../ui/screens/core/users/users.component';

export class ApiUserService extends UserService {
  private users: User[] = [];
  private reports: ReportedUser[] = [];
  private totalUsers = 0;
  private filterUsersNumber = 0;
  private totalReports =  0;
  private userController;

  constructor(private http: HttpClient) {
    super();
    this.userController = new UserController(this.http);
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const response = await firstValueFrom(this.userController.login(email, password));
      return response.Token;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Error al iniciar sesión');
    }
  }

  async validateSession(token: string): Promise<boolean> {
    try {
      const reposne = await firstValueFrom(this.userController.validateSession(token));

      return reposne;
    } catch (error) {
      console.error('Error en la validación de sesión:', error);
      throw new Error('Error al validar la sesión');
    }
  }



  async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getCurrentUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id) ?? undefined;
  }

  async loadAllUsers(): Promise<void> {
    if(this.totalUsers > 0) {
      return
    }
    const userDTOs = await firstValueFrom(this.userController.loadAllUsers());
    this.users = userDTOs.map(userDTO =>
      new User(
        userDTO.id,
        new Date(userDTO.registrationDate),
        userDTO.email,
        userDTO.blockedUsers || [],
        userDTO.reportedUsers.map(reportedUserId => new ReportedUser(
          reportedUserId,
          "",
          new Date().toISOString(),
          ReportType.ALL,
          "",
          "",
        )),
        userDTO.registered,
        userDTO.registered ? Status.Active : Status.Inactive
      ));
    this.totalUsers = this.users.length;
  }


  async getReportsBy(reportType: ReportType = ReportType.ALL, limit: number = 10, offset: number = 0): Promise<ReportedUser[]> {
    const filteredReports = this.reports.filter(report => report.predefinedReason === reportType || reportType === ReportType.ALL);
    this.totalReports = filteredReports.length;

    const paginatedReports = filteredReports.slice(offset, offset + limit);

    return paginatedReports;
  }


  async getUserReports(id: string, reportType: ReportType = ReportType.ALL, limit: number, offset: number): Promise<ReportedUser[]> {
    const filteredReports = this.reports.filter(report => (report.predefinedReason === reportType || reportType === ReportType.ALL) && report.reportingUserId === id || report.reportedUserId === id);
    this.totalReports = filteredReports.length;

    const paginatedReports = filteredReports.slice(offset, offset + limit);

    return paginatedReports;
  }

  async getStadistics(): Promise<Statistics[]> {
    return await firstValueFrom(this.userController.getStadistics());
  }

  async getMetrics(): Promise<Metrics[]> {
    const metrics: Metrics[] = [
      new Metrics('Total Users', this.totalUsers),
      new Metrics('Total Reports', this.totalReports),
      new Metrics('Active users', this.users.filter(user => user.status === Status.Active).length),
    ];

    return metrics;
  }

  async getUsersByName(name: string, limit: number = 10, offset: number = 0): Promise<User[]> {
    const users = this.users.filter(user => user.email.includes(name));
    this.filterUsersNumber = users.length;
    return users.slice(offset, offset + limit);
  }

  async getUserByStatus(status: string, limit: number = 10, offset: number = 0): Promise<User[]> {
    const users = this.users.filter(user => user.status === status || status === 'All');
    this.filterUsersNumber = users.length;
    return users.slice(offset, offset + limit);
  }

  async getTotalUsersNumber(): Promise<number> {
    return this.filterUsersNumber;
  }


  async loadReports(): Promise<void> {
    if(this.reports.length > 0) {
      return;
    }
    const response = await firstValueFrom(this.userController.loadReports());

    this.reports = response.map(report => new ReportedUser(
      report.id,
      report.reportedUserId,
      report.createdAt,
      ReportType[report.predefinedReason as keyof typeof ReportType],
      report.details,
      report.comment,
    ));
    this.totalReports = this.reports.length;
  }
  async getTotalReportsNumber(): Promise<number> {
    return this.totalReports;
  }


}
