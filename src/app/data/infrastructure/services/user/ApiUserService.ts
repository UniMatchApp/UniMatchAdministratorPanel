import {Metrics, ReportType, Statistics, UserService} from '../../../application/services/UserService';
import {User} from '../../../domain/models/User';
import {ReportedUser} from '../../../domain/models/ReportedUser';
import {UserController} from '../../../controller/UserController';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class ApiUserService extends UserService {
  private users: User[] = [];
  private reports: ReportedUser[] = [];
  private totalUsers = 0;
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
      console.log("Pene",reposne);
      return reposne;
    } catch (error) {
      console.error('Error en la validación de sesión:', error);
      throw new Error('Error al validar la sesión');
    }
  }



  async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getCurrentUser(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async loadAllUsers(): Promise<void> {
    const userDTOs = await firstValueFrom(this.userController.loadAllUsers());

    console.log("Userdtot: ", userDTOs);
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
        ReportType.All,
        "",
        "",
      )),
      userDTO.registered,
    ));


    this.totalUsers = this.users.length;
  }


  async getReportsBy(reportType: ReportType = ReportType.All, limit: number = 10, offset: number = 0): Promise<ReportedUser[]> {
    throw new Error('Method not implemented.');
  }

  async getUserReports(): Promise<ReportedUser[]> {
    throw new Error('Method not implemented.');
  }

  async getStadistics(): Promise<Statistics[]> {
    throw new Error('Method not implemented.');
  }

  async getMetrics(): Promise<Metrics[]> {
    throw new Error('Method not implemented.');
  }

  async getUsersByName(name: string, limit: number = 10, offset: number = 0): Promise<User[]> {
    const users = this.users.filter(user => user.email.includes(name));
    this.totalUsers = users.length;
    return users.slice(offset, offset + limit);
  }

  async getUserByStatus(status: string, limit: number = 10, offset: number = 0): Promise<User[]> {
    const users = this.users.filter(user => user.status === status || status === 'All');
    this.totalUsers = users.length;
    return users.slice(offset, offset + limit);
  }

  async getTotalUsersNumber(): Promise<number> {
    return this.totalUsers;
  }

  async loadReports(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getTotalReportsNumber(): Promise<number> {
    throw new Error('Method not implemented.');
  }


}
