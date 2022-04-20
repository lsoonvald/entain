import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthFacadeService } from '../auth-facade.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private facade: AuthFacadeService, public router: Router) {}

  canActivate(): boolean {
    if (!this.facade.accessToken) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
