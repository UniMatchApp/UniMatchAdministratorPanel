import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-side-bar',
  imports: [],
  templateUrl: './administrator-side-bar.component.html',
  standalone: true,
  styleUrl: './administrator-side-bar.component.css'
})
export class AdministratorSideBarComponent {

  constructor(private router: Router) {}


}
