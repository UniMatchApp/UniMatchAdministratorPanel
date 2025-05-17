import {User} from '../../domain/models/User';
import {ReportedUser} from '../../domain/models/ReportedUser';
import {Status} from '../../../ui/screens/core/users/users.component';
import {Injectable} from '@angular/core';

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
  columns: string[];
  table: Stats[];

  constructor(title: string, columns: string[], table: Stats[]) {
    this.title = title;
    this.columns = columns;
    this.table = table;
  }
}

export class Metrics {
  title: string;
  value: number;

  constructor(title: string, value: number) {
    this.title = title;
    this.value = value;
  }
}

export enum ReportType {
  ALL = 'ALL',
  SPAM = 'SPAM',
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
  HARASSMENT = 'HARASSMENT',
}

@Injectable({
  providedIn: 'root'
})
export abstract class UserService {
  abstract login(email: string, password: string): Promise<string>;
  abstract logout(): Promise<void>;
  abstract deleteUser(userId: string): Promise<void>;
  abstract getCurrentUser(id: string): Promise<User | undefined>;
  abstract loadAllUsers(): Promise<void>;
  abstract getReportsBy(reportType: ReportType, limit: number, offset: number): Promise<ReportedUser[]>;
  abstract getUserReports(id: string, reportType: ReportType, limit: number, offset: number): Promise<ReportedUser[]>;
  abstract getMetrics(): Promise<Metrics[]>;
  abstract getStadistics(): Promise<Statistics[]>;
  abstract getUsersByName(name: string, limit: number, offset: number): Promise<User[]>;
  abstract getUserByStatus(status: Status, limit: number, offset: number): Promise<User[]>;
  abstract getTotalUsersNumber(): Promise<number>;
  abstract loadReports(): Promise<void>;
  abstract getTotalReportsNumber(): Promise<number>;
  abstract validateSession(token: string): Promise<boolean>;
}
