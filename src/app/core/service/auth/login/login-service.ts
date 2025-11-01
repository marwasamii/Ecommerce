import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IRegister } from '../../../interface/auth/iregister';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private id: Object, private router:Router, private cookies:CookieService) {
    // if (isPlatformBrowser(id)) {
    //   if (localStorage.getItem('token')) {
    //     this.decodedUserData();
    //   }
    // }
     if (cookies.get('token')) {
        this.decodedUserData();
      }
  }

  userData: BehaviorSubject<null | JwtPayload> = new BehaviorSubject<null | JwtPayload>(null);
  loginData(payload: IRegister | any): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signin`, payload)
  }
  decodedUserData() {
    const token = this.cookies.get('token')!;
    const decoded = jwtDecode(token);
    console.log(decoded)
    this.userData.next(decoded);
  }

  logOut() {
    // remove token
    this.cookies.delete('token')
    // userData => null
    this.userData.next(null);
    // navigate login
    this.router.navigate(['/login'])
  }

}
