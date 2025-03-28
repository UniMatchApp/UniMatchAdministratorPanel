import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { UserService } from '../../data/application/services/UserService';
import { User } from '../../data/domain/models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status } from '../../ui/screens/core/users/users.component';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private loginObjectSubject = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private sessionStorageService: SessionStorageService,
    private userService: UserService
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    try {

      const user = await this.userService.login(email, password);

      if (user) {
        this.isLoggedIn.next(true);
        this.loginObjectSubject.next(user);
        this.storeUser(user);
        return true;
      } else {
        this.clearSession();
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.clearSession();
      return false;
    }
  }

  logout() {
    this.clearSession();
  }

  private storeUser(user: User) {
    this.sessionStorageService.set('admin', user);
  }

  private clearSession() {
    this.sessionStorageService.remove('admin');
    this.isLoggedIn.next(false);
    this.loginObjectSubject.next(undefined);
  }

  isLoggedIn$() {
    return this.isLoggedIn;
  }

  getCurrentUser() {
    return this.loginObjectSubject.asObservable();
  }
}
