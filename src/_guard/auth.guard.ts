// Default Modules
import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
} from '@angular/router';

// Generated Services
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const user = this.userService.userValue;
    if (user) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): any {
    return this.canActivate(route, state);
  }

  canLoad(): any {
    const user = this.userService.userValue;
    if (user) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
