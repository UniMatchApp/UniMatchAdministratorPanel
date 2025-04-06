import {User} from '../../domain/models/User';
import {ReportedUser} from '../../domain/models/ReportedUser';
import {Metrics, ReportType, Statistics, Stats} from '../../application/services/UserService';
import {Status} from '../../../ui/screens/core/users/users.component';

export function createMockUsers() {
    return new User(
        '1',
        new Date('2021-01-01'),
        'benitocamela@gmail.com',
        ['1', '2'],
        [
            new ReportedUser(
                '0',
                '1',
                "2023-10-01",
                ReportType.HARASSMENT,
                'This user is posting spam'
            ),
            new ReportedUser(
                '1',
                '2',
                "2023-10-01",
                ReportType.SPAM,
                'This user is posting offensive content'
            )
        ],
        true,
        Status.Active
    )
}

export function createMocksUsers() {
  let users: User[] = [];

  for (let i = 0; i < 19; i++) {
    users.push(createMockUsers());
  }
  return users;
}

export function createStadistics(): Statistics[] {
  return [
    new Statistics('Most Active Countries', 'assets/asia.png', ['Country', 'Users', 'Active'], [
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235),
      new Stats('China', 2400, 1235)
    ]),
    new Statistics('Users by gender', '', ['Gender', 'Users', 'Active'], [
      new Stats('Men', 2400, 1235),
      new Stats('Woman', 2400, 1235),
      new Stats('Non-binary', 2400, 1235),
      new Stats('Other', 2400, 1235)
    ]),
    new Statistics('Users by relationship', '', ['Relationship', 'Users', 'Active'], [
      new Stats('Friends', 2400, 1235),
      new Stats('Couple', 2400, 1235),
      new Stats('Others', 2400, 1235)
    ]),
    new Statistics('Users by orientation', '', ['Orientation', 'Users', 'Active'], [
      new Stats('Heterosexual', 2400, 1235),
      new Stats('Homosexual', 2400, 1235),
      new Stats('Other', 2400, 1235)
    ])
  ];
}

export function createMetrics(): Metrics[] {
  return [
    new Metrics('Users', 100, 5.2),
    new Metrics('Users', 0, 5.2),
    new Metrics('Matches', 0, -3.2),
    new Metrics('Uploads', 0, 2.2),
  ];
}
