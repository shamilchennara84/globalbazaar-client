import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = authService.isAdminLoggedIn();
  if (!isAdmin) {
    router.navigate(['/admin']);
    return false;
  }
  return true;
};
