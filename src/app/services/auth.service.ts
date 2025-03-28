import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import {from, Observable} from 'rxjs';
import {UserService} from '../data/application/services/UserService';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private userService: UserService,
    private loginService: LoginService,
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    return this.loginService.login(email, password);
  }

  logout() {
    this.loginService.logout();
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginService.isLoggedIn$();
  }

}
