import {ReportedUser} from './ReportedUser';
import {Status} from '../../../ui/screens/core/users/users.component';

export class User {
  constructor(
    public id: string,
    public registrationDate: Date,
    public email: string,
    public blockedUsers: string[] = [],
    public reportedUsers: ReportedUser[] = [],
    public registered: boolean = false,
    public status: Status = Status.All,
  ) {}
}
