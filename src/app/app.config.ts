import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {HttpClient, provideHttpClient} from '@angular/common/http';

import {routes} from './app.routes';
import {UserService} from './data/application/services/UserService';
import {MockProfileService} from './data/infrastructure/services/profile/MockProfileService';
import {ProfileService} from './data/application/services/ProfileService';
import {ApiUserService} from './data/infrastructure/services/user/ApiUserService';
import {ApiProfileService} from './data/infrastructure/services/profile/ApiProfileService';
import {MatchingService} from './data/application/services/MatchingService';
import {ApiMatchingService} from './data/infrastructure/services/matching/ApiMatchingService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: UserService, useClass: ApiUserService, deps: [HttpClient] },
    { provide: ProfileService, useClass: ApiProfileService, deps: [HttpClient] },
    { provide: MatchingService, useClass: ApiMatchingService, deps: [HttpClient] }
  ],
};
