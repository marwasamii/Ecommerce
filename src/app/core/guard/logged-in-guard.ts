import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/auth/login/login-service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {

  const auth = inject(LoginService);
  const router = inject(Router);
  if (auth.userData.getValue() !== null) {
    return router.parseUrl('/home')
  } else {
    return true;
  }
};
