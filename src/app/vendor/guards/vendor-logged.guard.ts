import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const vendorLoggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = authService.isVendorLoggedIn();
  if (isAdmin) {
    router.navigate(['/vendor', 'dashboard']);
    return false;
  }
  return true;
};
