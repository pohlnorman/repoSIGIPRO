import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogged()) {
    const roleName = authService.getRoleName();
    if (route.data['role'] && route.data['role'].indexOf(roleName) === -1) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};


