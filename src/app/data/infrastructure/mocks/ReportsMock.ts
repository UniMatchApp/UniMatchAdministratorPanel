import { ReportedUser } from '../../domain/models/ReportedUser';
import { ReportType } from '../../application/services/UserService';

const REPORT_MESSAGES: Record<Exclude<ReportType, ReportType.ALL>, string> = {
  [ReportType.SPAM]: 'This user is posting spam content',
  [ReportType.HARASSMENT]: 'This user is sharing inappropriate content',
  [ReportType.INAPPROPRIATE_CONTENT]: 'This user is being abusive towards others',
};

export function createMockReports(): ReportedUser[] {
  const reports: ReportedUser[] = [];
  const reportTypes = Object.values(ReportType).filter(type => type !== ReportType.ALL); // Excluye "All"

  for (let i = 1; i <= 20; i++) {
    const reporterId = `${i}`;
    const reportedId = `${i + 1}`;
    const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)] as ReportType;
    const reportMessage = REPORT_MESSAGES[reportType as Exclude<ReportType, ReportType.ALL>];

    reports.push(new ReportedUser(reporterId, reportedId, "25/02/2025", reportType, reportMessage));
  }

  return reports;
}
