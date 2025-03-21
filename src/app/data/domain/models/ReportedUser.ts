export class ReportedUser {
  constructor(
    public readonly reportedUserId: string,
    public readonly reportingUserId: string,
    public predefinedReason: string,
    public comment?: string
  ) {}
}
