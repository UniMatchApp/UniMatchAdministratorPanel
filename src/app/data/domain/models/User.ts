import {ReportedUser} from './ReportedUser';

export class User {
  constructor(
    public id: string,
    public registrationDate: Date,
    public email: string,
    public blockedUsers: string[] = [],
    public reportedUsers: ReportedUser[] = [],
    public registered: boolean = false,
  ) {}
}
