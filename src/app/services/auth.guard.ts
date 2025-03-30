import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    switchMap((isLoggedIn: boolean) => {
      console.log('isLoggedIn', isLoggedIn);
      if (isLoggedIn) {
        return [true];
      } else {
        return [router.createUrlTree(['/login'])];
      }
    })
  ) as Observable<boolean | UrlTree>;
};
