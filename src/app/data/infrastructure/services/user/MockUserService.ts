import {Metrics, ReportType, Statistics, UserService} from '../../../application/services/UserService';
import {User} from '../../../domain/models/User';
import {createMetrics, createMocksUsers, createMockUsers, createStadistics} from '../../mocks/UserMock';
import {ReportedUser} from '../../../domain/models/ReportedUser';
import {createMockReports} from '../../mocks/ReportsMock';
import {Status} from '../../../../ui/screens/core/users/users.component';

export class MockUserService extends UserService {

  private users: User[] = [];
  private reports: ReportedUser[] = [];
  private totalUsers = 0;
  private totalReports =  0;

  async login(email: string, password: string): Promise<User> {
    return new User(
      "12321",
      new Date(),
      email,
      [],
      [],
      true,
      Status.Active
    )
  }

  async logout(): Promise<void> {
    console.log('Mock logout');
  }

  async getCurrentUser(): Promise<User> {
    return createMockUsers();
  }

  async loadAllUsers(): Promise<void> {
    this.users = createMocksUsers();
    this.totalUsers = this.users.length;
  }

  async getReportsBy(reportType: ReportType = ReportType.All, limit: number = 10, offset: number = 0): Promise<ReportedUser[]> {
    const reports = this.reports.filter(report => report.predefinedReason === reportType || reportType === ReportType.All);
    this.totalReports = reports.length;
    return reports.slice(offset, limit + offset);
  }

  async getUserReports(): Promise<ReportedUser[]> {
    return (await this.getCurrentUser()).reportedUsers;
  }

  async getStadistics(): Promise<Statistics[]> {
    return createStadistics();
  }

  async getMetrics(): Promise<Metrics[]> {
    return createMetrics();
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
    this.reports = createMockReports();
  }
  async getTotalReportsNumber(): Promise<number> {
    return this.totalReports;
  }
}
