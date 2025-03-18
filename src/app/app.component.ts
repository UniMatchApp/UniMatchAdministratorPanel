import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './ui/components/shared/header/header.component';
import {
  AdministratorSideBarComponent
} from './ui/components/shared/administrator-side-bar/administrator-side-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AdministratorSideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'unimatch-administrator';
}
