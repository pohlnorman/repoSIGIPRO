import { HttpInterceptorFn } from '@angular/common/http';

export const authBasicInterceptor: HttpInterceptorFn = (req, next) => {
  const testReq=req.clone({
    setHeaders: {
      "Authorization":"Basic c2lnaXBybzpzaWdpcHJv"
    }
  });
  return next(req);
};
