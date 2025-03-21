import {ReportedUser} from '../../domain/models/ReportedUser';

export function createMockReports() {
  return [
    new ReportedUser(
      '1',
      '2',
      'Spam',
      'This user is posting spam'
    ),
    new ReportedUser(
      '2',
      '3',
      'Offensive',
      'This user is posting offensive content'
    )
  ];
}

