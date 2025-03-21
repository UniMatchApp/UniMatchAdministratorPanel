import {ProfileInfo, ProfileService} from '../../../application/services/ProfileService';
import {Profile} from '../../../domain/models/Profile';
import {createMockProfile} from '../../mocks/ProfileMock';

export class MockProfileService implements ProfileService {

  async getProfileInfo(userId: string): Promise<ProfileInfo> {
    return new ProfileInfo('1', 'Benito Camela', 'benitocamela@gmail.com', 'https://www.penstagram.com/uploads/default/original/3X/4/d/4dcc31393f96cdb3ca155c33cb32e0e429344724.jpeg');
  }

  async getProfile(userId: string): Promise<Profile> {
    return createMockProfile()
  }
}
