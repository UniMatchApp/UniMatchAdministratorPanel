import {User} from '../../domain/models/User';
import {ReportedUser} from '../../domain/models/ReportedUser';

export function createMockUsers() {
    return new User(
        new Date('2021-01-01'),
        'benitocamela@gmail.com',
        ['1', '2'],
        [
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
        ],
      true
    )
}

export function createStadistics() {
  return [
    { title: 'Most Active Countries', image: 'assets/asia.png', columns: ['Country', 'Users', 'Active'], table: [
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 },
        { stat: 'China', users: 2400, actives: 1235 }
      ]},
    { title: 'Users by gender', image: '', columns: ['Gender', 'Users', 'Active'], table: [
        { stat: 'Men', users: 2400, actives: 1235 },
        { stat: 'Woman', users: 2400, actives: 1235 },
        { stat: 'Non-binary', users: 2400, actives: 1235 },
        { stat: 'Other', users: 2400, actives: 1235 }
      ]},
    { title: 'Users by relationship', image: '', columns: ['Relationship', 'Users', 'Active'], table: [
        { stat: 'Friends', users: 2400, actives: 1235 },
        { stat: 'Couple', users: 2400, actives: 1235 },
        { stat: 'Others', users: 2400, actives: 1235 }
      ]},
    { title: 'Users by orientation', image: '', columns: ['Orientation', 'Users', 'Active'], table: [
        { stat: 'Heterosexual', users: 2400, actives: 1235 },
        { stat: 'Homosexual', users: 2400, actives: 1235 },
        { stat: 'Other', users: 2400, actives: 1235 },
      ]}
  ];
}

export function createMetrics() {
    return [
      { title: 'Users', value: 0, percentage: "+ 5.2%" },
      { title: 'Matches', value: 0, percentage: "- 3.2%" },
      { title: 'Uploads', value: 0, percentage: "+ 2.2%" },
      { title: 'Active users', value: 0, percentage: "+ 1.2%" }
    ];
}
