import {User} from '../../domain/models/User';
import {ReportedUser} from '../../domain/models/ReportedUser';

export interface UserService {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  getReports(): Promise<ReportedUser[]>;
  getUserReports(): Promise<ReportedUser[]>;
}
