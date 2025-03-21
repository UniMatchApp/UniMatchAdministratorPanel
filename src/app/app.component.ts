import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './ui/components/shared/header/header.component';
import {
  AdministratorSideBarComponent
} from './ui/components/shared/administrator-side-bar/administrator-side-bar.component';
import {MockUserService} from './data/infrastructure/services/user/MockUserService';
import {MockProfileService} from './data/infrastructure/services/profile/MockProfileService';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AdministratorSideBarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  providers: [
    MockUserService,
    MockProfileService
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'unimatch-administrator';
}
