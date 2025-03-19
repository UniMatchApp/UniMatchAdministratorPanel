import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-administrator-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './administrator-side-bar.component.html',
  standalone: true,
  styleUrl: './administrator-side-bar.component.css'
})
export class AdministratorSideBarComponent {

  constructor(private router: Router) {}


}
