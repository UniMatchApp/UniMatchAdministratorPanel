import { ValuesAndBeliefs } from "../../domain/enums/ValuesAndBeliefs";
import { Gender } from "../../domain/enums/Gender";
import { SexualOrientation } from "../../domain/enums/SexualOrientation";
import { RelationshipType } from "../../domain/enums/RelationshipType";
import { Location} from '../../domain/models/Location';
import { Horoscope } from "../../domain/enums/Horoscope";
import { Habits } from "../../domain/enums/Habits";
import { Profile } from "../../domain/models/Profile";

export function createMockProfile(): Profile {
  return new Profile(
    'user123',
    'John Doe',
    30,
    'About me text',
    Gender.MALE,
    SexualOrientation.HETEROSEXUAL,
    RelationshipType.LONG_TERM,
    new Date('1993-01-01'),
    ['reading', 'traveling'],
    ['image1.jpg', 'image2.jpg'],
    new Location(40.7128, -74.0060),
    'image1.jpg',
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
