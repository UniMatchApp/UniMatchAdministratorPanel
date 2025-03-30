import {ReportType} from '../../application/services/UserService';

export class ReportedUser {
  constructor(
    public readonly reportedUserId: string,
    public readonly reportingUserId: string,
    public date: string,
    public predefinedReason: ReportType,
    public details: string,
    public comment?: string
  ) {}
}
