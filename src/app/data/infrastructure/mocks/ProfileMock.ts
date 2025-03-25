import { ValuesAndBeliefs } from "../../domain/enums/ValuesAndBeliefs";
import { Gender } from "../../domain/enums/Gender";
import { SexualOrientation } from "../../domain/enums/SexualOrientation";
import { RelationshipType } from "../../domain/enums/RelationshipType";
import { Location} from '../../domain/models/Location';
import { Horoscope } from "../../domain/enums/Horoscope";
import { Habits } from "../../domain/enums/Habits";
import { Profile } from "../../domain/models/Profile";
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export function createMockProfile(): Profile {
  return new Profile(
    uuidv4(),
    faker.name.fullName(),
    faker.number.int({ min: 18, max: 60 }),
    faker.lorem.sentence(),
    Gender.MALE,
    SexualOrientation.HETEROSEXUAL,
    RelationshipType.LONG_TERM,
    new Date('1993-01-01'),
    ['reading', 'traveling'],
    ['image1.jpg', 'image2.jpg'],
    new Location(40.7128, -74.0060),
    'https://www.penstagram.com/uploads/default/original/3X/4/d/4dcc31393f96cdb3ca155c33cb32e0e429344724.jpeg',
    100,
    [25, 35],
    Horoscope.ARIES,
    180,
    75,
    'Software Engineer',
    'Bachelor\'s Degree',
    'INTJ',
    'Dog',
    Habits.OCCASIONALLY,
    Habits.NEVER,
    Habits.NEVER,
    ValuesAndBeliefs.AGNOSTIC,
    Gender.FEMALE,
    'Fun fact about me',
    true
  );
}
export function createMultipleUsers(count: number): Profile[] {
  const users: Profile[] = [];
  for (let i = 0; i < count; i++) {
    users.push(createMockProfile());
  }
  return users;
}

