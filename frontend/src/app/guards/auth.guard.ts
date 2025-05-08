import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const authResponse = await firstValueFrom(authService.checkSession()).catch(e=>{
    router.navigate(['/login']);
    return null;
  });

  if (authResponse && authResponse.isAuthenticated && authResponse.user?.rolId) {
    const roleId: number = Number(authResponse.user?.rolId);
    if (route.data['role'] && route.data['role'].indexOf(roleId) === -1) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};


