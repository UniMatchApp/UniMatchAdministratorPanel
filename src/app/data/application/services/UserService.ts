import {User} from '../../domain/models/User';

export interface UserService {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
}
