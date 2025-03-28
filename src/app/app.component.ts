import { Component } from '@angular/core';
import {NavigationEnd, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './ui/components/shared/header/header.component';
import {
  AdministratorSideBarComponent
} from './ui/components/shared/administrator-side-bar/administrator-side-bar.component';
import {MockUserService} from './data/infrastructure/services/user/MockUserService';
import {MockProfileService} from './data/infrastructure/services/profile/MockProfileService';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {UserService} from './data/application/services/UserService';
import {ProfileService} from './data/application/services/ProfileService';
import { Router } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AdministratorSideBarComponent, FontAwesomeModule, NgIf],
  templateUrl: './app.component.html',
  standalone: true,
  providers: [
    { provide: UserService, useClass: MockUserService },
    { provide: ProfileService, useClass: MockProfileService },

  ],
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'unimatch-administrator';

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
