import {ReportType} from '../../application/services/UserService';

export class ReportedUser {
  constructor(
    public readonly reportedUserId: string,
    public readonly reportingUserId: string,
    public predefinedReason: ReportType,
    public comment?: string
  ) {}
}
