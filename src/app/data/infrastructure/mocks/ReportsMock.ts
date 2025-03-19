import {ReportedUser} from '../../domain/models/ReportedUser';

export function createMockReports() {
  return [
    new ReportedUser(
      '1',
      'Spam',
      'This user is posting spam'
    ),
    new ReportedUser(
      '2',
      'Offensive',
      'This user is posting offensive content'
    )
  ];
}

