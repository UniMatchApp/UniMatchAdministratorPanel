import {Metrics, ReportType, Statistics, UserService} from '../../../application/services/UserService';
import {User} from '../../../domain/models/User';
import {ReportedUser} from '../../../domain/models/ReportedUser';
import {Status} from '../../../../ui/screens/core/users/users.component';
import {createMetrics, createMocksUsers, createMockUsers, createStadistics} from '../../mocks/UserMock';
import {createMockReports} from '../../mocks/ReportsMock';
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


  async logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getCurrentUser(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async loadAllUsers(): Promise<void> {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }

  async getUserByStatus(status: string, limit: number = 10, offset: number = 0): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  async getTotalUsersNumber(): Promise<number> {
    throw new Error('Method not implemented.');
  }

  async loadReports(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async getTotalReportsNumber(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
