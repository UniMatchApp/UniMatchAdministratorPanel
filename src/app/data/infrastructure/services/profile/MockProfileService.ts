import {ProfileInfo, ProfileService} from '../../../application/services/ProfileService';
import {Profile} from '../../../domain/models/Profile';
import {createMockProfile} from '../../mocks/ProfileMock';

export class MockProfileService implements ProfileService {

  async getProfileInfo(userId: string): Promise<ProfileInfo> {
    return new ProfileInfo('1', 'Benito Camela', 'benitocamela@gmail.com');
  }

  async getProfile(userId: string): Promise<Profile> {
    return createMockProfile()
  }
}
