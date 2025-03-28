import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { UserService } from './data/application/services/UserService';
import { MockUserService } from './data/infrastructure/services/user/MockUserService';
import {MockProfileService} from './data/infrastructure/services/profile/MockProfileService';
import {ProfileService} from './data/application/services/ProfileService';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: UserService, useClass: MockUserService },
    { provide: ProfileService, useClass: MockProfileService }
  ],
};
