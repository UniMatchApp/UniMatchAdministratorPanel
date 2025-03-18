import { Location} from './Location';
import { Gender} from '../enums/Gender';
import {SexualOrientation} from '../enums/SexualOrientation';
import {RelationshipType} from '../enums/RelationshipType';
import {Horoscope} from '../enums/Horoscope';
import {Habits} from '../enums/Habits';
import {ValuesAndBeliefs} from '../enums/ValuesAndBeliefs';

export class Profile {
  constructor(
    public userId: string,
    public name: string,
    public age: number,
    public aboutMe: string,
    public gender: Gender,
    public sexualOrientation: SexualOrientation,
    public relationshipType: RelationshipType,
    public birthday: Date,
    public interests: string[] = [],
    public wall: string[] = [],
    public location?: Location,
    public preferredImage: string = wall[0] || "",
    public maxDistance: number = 50,
    public ageRange: [number, number] = [18, 100],
    public horoscope?: Horoscope,
    public height?: number,
    public weight?: number,
    public job?: string,
    public education?: string,
    public personalityType?: string,
    public pets?: string,
    public drinks?: Habits,
    public smokes?: Habits,
    public doesSports?: Habits,
    public valuesAndBeliefs?: ValuesAndBeliefs,
    public genderPriority?: Gender,
    public fact?: string,
    public isNew: boolean = true
  ) {}
}
