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
