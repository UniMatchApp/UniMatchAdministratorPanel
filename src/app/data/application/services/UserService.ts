import {User} from '../../domain/models/User';
import {ReportedUser} from '../../domain/models/ReportedUser';
import {Status} from '../../../ui/screens/core/users/users.component';

export class Stats {
  stat: string;
  users: number;
  actives: number;

  constructor(stat: string, users: number, actives: number) {
    this.stat = stat;
    this.users = users;
    this.actives = actives;
  }
}

export class Statistics {
  title: string;
  image: string;
  columns: string[];
  table: Stats[];

  constructor(title: string, image: string, columns: string[], table: Stats[]) {
    this.title = title;
    this.image = image;
    this.columns = columns;
    this.table = table;
  }
}

export class Metrics {
  title: string;
  value: number;
  percetage: number;

  constructor(title: string, value: number, percetage: number) {
    this.title = title;
    this.value = value;
    this.percetage = percetage;
  }
}

export interface UserService {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getReports(): Promise<ReportedUser[]>;
  getUserReports(): Promise<ReportedUser[]>;
  getMetrics(): Promise<Metrics[]>;
  getStadistics(): Promise<Statistics[]>;
  getUsersByName(name: string): Promise<User[]>;
  getUserByStatus(status: Status): Promise<User[]>;
}
