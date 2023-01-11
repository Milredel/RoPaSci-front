import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ApiAuthService } from './auth.service';
import { ToastService } from '../toast/toast.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private apiAuthSrv: ApiAuthService,
    private router: Router,
    private toastService: ToastService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.apiAuthSrv.authenticated()) {
      this.router.navigate([`/login`]);
      this.apiAuthSrv.logout();
      return false;
    }

    return true;
  }
}
