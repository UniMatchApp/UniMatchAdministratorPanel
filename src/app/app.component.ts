import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './ui/components/shared/header/header.component';
import {
  AdministratorSideBarComponent
} from './ui/components/shared/administrator-side-bar/administrator-side-bar.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AdministratorSideBarComponent, FontAwesomeModule, NgIf],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'unimatch-administrator';

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
