import {ReportedUser} from './ReportedUser';

export class User {
  constructor(
    public registrationDate: Date,
    public email: string,
    public blockedUsers: string[] = [],
    public reportedUsers: ReportedUser[] = [],
    public registered: boolean = false,
  ) {}
}
