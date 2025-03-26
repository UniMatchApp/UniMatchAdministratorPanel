import {Metrics, Statistics, UserService} from '../../../application/services/UserService';
import {User} from '../../../domain/models/User';
import {createMetrics, createMocksUsers, createMockUsers, createStadistics} from '../../mocks/UserMock';
import {ReportedUser} from '../../../domain/models/ReportedUser';
import {createMockReports} from '../../mocks/ReportsMock';

export class MockUserService extends UserService {

  private users: User[] = [];

  async login(email: string, password: string): Promise<void> {
    console.log(`Mock login with email: ${email}`);
  }

  async logout(): Promise<void> {
    console.log('Mock logout');
  }

  async getCurrentUser(): Promise<User> {
    return createMockUsers();
  }

  async loadAllUsers(): Promise<void> {
    this.users = createMocksUsers();
  }

  async getReports(): Promise<ReportedUser[]> {
    return createMockReports();
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
    return this.users.filter(user => user.email.includes(name)).slice(offset, offset + limit);
  }

  async getUserByStatus(status: string, limit: number = 10, offset: number = 0): Promise<User[]> {
    return this.users.filter(user => user.status === status || status === 'All').slice(offset, offset + limit);
  }

  async getTotalUsersNumber(): Promise<number> {
    return this.users.length;
  }
}
