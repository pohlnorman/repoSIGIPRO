import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { api } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  const token = authService.getToken();
  if (token != null && req.urlWithParams.startsWith(api.host)) {
    const cloneReq = req.clone({
      setHeaders: {
        "Authorization": "Bearer " + token
      }
    });
    return next(cloneReq);
  }
  return next(req);
};
