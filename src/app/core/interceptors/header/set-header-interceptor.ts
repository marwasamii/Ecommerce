import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  const cookie = inject(CookieService)

  if(req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')){
    req = req.clone({
    setHeaders:{
      token:cookie.get('token')
    }
  })
  }
  return next(req);
};
