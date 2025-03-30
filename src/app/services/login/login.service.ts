import { Injectable } from '@angular/core';
import { SessionStorageService } from 'angular-web-storage';
import { UserService } from '../../data/application/services/UserService';
import { User } from '../../data/domain/models/User';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);


  private loginObjectSubject = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private sessionStorageService: SessionStorageService,
    private userService: UserService
  ) {
    this.checkTokenValidation().then(
      isValid => {
        console.log('Resultado de la validación del token:', isValid);
        this.isLoggedIn.next(isValid);
      }
    );
  }

  async login(email: string, password: string): Promise<boolean> {
    try {

      const token = await this.userService.login(email, password);

      if (token) {
        this.isLoggedIn.next(true);
        this.loginObjectSubject.next(token);
        this.storeToken (token);
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

  async checkTokenValidation(): Promise<boolean> {
    const token = this.sessionStorageService.get('bearer-token');
    if (token) {
      try {
        return await this.userService.validateSession(token);
      } catch (error) {
        console.error('Error al validar el token:', error);
        this.clearSession();
        return false;
      }
    }
    return false;
  }

  isLoggedIn$() {
    return this.isLoggedIn;
  }

  logout() {
    this.clearSession();
  }

  private storeToken(token: string) {
    this.sessionStorageService.set('bearer-token', token);
  }

  private clearSession() {
    this.sessionStorageService.remove('bearer-token');
    this.isLoggedIn.next(false);
    this.loginObjectSubject.next(undefined);
  }

  getCurrentUser() {
    return this.loginObjectSubject.asObservable();
  }
}
