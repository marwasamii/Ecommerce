import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/auth/login/login-service';

export const authGuard: CanActivateFn = (route, state) => {



  const auth = inject(LoginService);
  const router = inject(Router);
  if (auth.userData.getValue() !== null) {
    return true;
  } else {
    return router.parseUrl('/login')
  }

};
