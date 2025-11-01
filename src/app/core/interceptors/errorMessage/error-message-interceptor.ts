import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorMessageInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      toastr.error(err.error.message)
      return throwError(() => {
        return err;
      })
    })
  );
};
