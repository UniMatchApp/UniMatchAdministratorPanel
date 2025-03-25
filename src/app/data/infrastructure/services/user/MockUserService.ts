import { UserService } from '../../../application/services/UserService';
import {User} from '../../../domain/models/User';
import {createMetrics, createMocksUsers, createMockUsers, createStadistics} from '../../mocks/UserMock';
import {ReportedUser} from '../../../domain/models/ReportedUser';
import {createMockReports} from '../../mocks/ReportsMock';

export class MockUserService implements UserService {

  async login(email: string, password: string): Promise<void> {
    console.log(`Mock login with email: ${email}`);
  }

  async logout(): Promise<void> {
    console.log('Mock logout');
  }

  async getCurrentUser(): Promise<User> {
    return createMockUsers();
  }

  async getAllUsers(): Promise<User[]> {
    return createMocksUsers();
  }

  async getReports(): Promise<ReportedUser[]> {
    return createMockReports();
  }

  async getUserReports(): Promise<ReportedUser[]> {
    return (await this.getCurrentUser()).reportedUsers;
  }

  async getStadistics(): Promise<any> {
    return createStadistics();
  }

  async getMetrics(): Promise<any> {
    return createMetrics();
  }
}
