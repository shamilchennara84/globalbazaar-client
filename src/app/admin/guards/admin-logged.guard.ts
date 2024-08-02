import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const adminLoggedGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
 const router = inject(Router);

 const isAdmin = authService.isAdminLoggedIn();
 if (isAdmin) {
   router.navigate(['/admin', 'dashboard']);
   return false;
 }
 return true;
};
