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

export enum ReportType {
  All = 'All',
  Spam = 'Spam',
  Inappropriate = 'Inappropriate',
  Abusive = 'Abusive',
}

@Injectable({
  providedIn: 'root'
})
export abstract class UserService {
  abstract login(email: string, password: string): Promise<void>;
  abstract logout(): Promise<void>;
  abstract getCurrentUser(): Promise<User>;
  abstract loadAllUsers(): Promise<void>;
  abstract getReportsBy(reportType: ReportType, limit: number, offset: number): Promise<ReportedUser[]>;
  abstract getUserReports(): Promise<ReportedUser[]>;
  abstract getMetrics(): Promise<Metrics[]>;
  abstract getStadistics(): Promise<Statistics[]>;
  abstract getUsersByName(name: string, limit: number, offset: number): Promise<User[]>;
  abstract getUserByStatus(status: Status, limit: number, offset: number): Promise<User[]>;
  abstract getTotalUsersNumber(): Promise<number>;
  abstract loadReports(): Promise<void>;
  abstract getTotalReportsNumber(): Promise<number>;
}
