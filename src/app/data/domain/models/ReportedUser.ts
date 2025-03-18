export class ReportedUser {
  constructor(
    public readonly userId: string,
    public predefinedReason: string,
    public comment?: string
  ) {}
}
