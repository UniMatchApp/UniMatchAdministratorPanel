import {Profile} from '../../../domain/models/Profile';
import {ProfileInfo, ProfileService} from '../../../application/services/ProfileService';
import {UserController} from '../../../controller/UserController';
import {ProfileController} from '../../../controller/ProfileController';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Location} from '../../../domain/models/Location';
import {Gender, toDomain} from '../../../domain/enums/Gender';
import {SexualOrientation} from '../../../domain/enums/SexualOrientation';
import {RelationshipType} from '../../../domain/enums/RelationshipType';
import {Horoscope} from '../../../domain/enums/Horoscope';
import {Habits} from '../../../domain/enums/Habits';
import {ValuesAndBeliefs} from '../../../domain/enums/ValuesAndBeliefs';

export class ApiProfileService extends ProfileService{


  private profileController: ProfileController;

  constructor(private http: HttpClient) {
    super();
    this.profileController = new ProfileController(this.http);
  }

  async getProfileInfo(userId: string): Promise<ProfileInfo> {
    try {
      const response = await firstValueFrom(this.profileController.getProfileInfo(userId));
      return new ProfileInfo(
        response.id,
        response.name,
        response.email,
        response.avatar
      );
    } catch (error) {
      console.error('Error en getProfileInfo:', error);
      throw new Error('Error al obtener la información del perfil');
    }
  }

  async getProfile(userId: string): Promise<Profile> {
    try {
      const response = await firstValueFrom(this.profileController.getProfile(userId));
      return new Profile(
        response.userId,
        response.name,
        response.age,
        response.aboutMe,
        toDomain(Gender, response.gender) ?? Gender.OTHER,
        toDomain(SexualOrientation, response.sexualOrientation) ?? SexualOrientation.OTHER,
        toDomain(RelationshipType, response.relationshipType) ?? RelationshipType.OTHER,
        response.birthday,
        response.interests,
        response.wall,
        new Location(
          response.location?.latitude ?? 0,
          response.location?.longitude ?? 0,
          response.location?.altitude ?? 0
        ),
        response.preferredImage,
        response.maxDistance,
        [response.ageRange.min, response.ageRange.max],
        toDomain(Horoscope, response.horoscope),
        response.height,
        response.weight,
        response.job,
        response.education,
        response.personalityType,
        response.pets,
        toDomain(Habits, response.drinks),
        toDomain(Habits, response.smokes),
        toDomain(Habits, response.doesSports),
        toDomain(ValuesAndBeliefs, response.valuesAndBeliefs),
        toDomain(Gender, response.genderPriority),
        response.fact
      );
    } catch (error) {
      console.error('Error en getProfile:', error);
      throw new Error('Error al obtener el perfil');
    }
  }
}
