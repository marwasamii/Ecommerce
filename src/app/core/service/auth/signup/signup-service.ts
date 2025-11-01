import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { IRegister } from '../../../interface/auth/iregister';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  constructor(private http: HttpClient) { }


  registerData(payload:IRegister | any): Observable<any> {
    return this.http.post(`${environment.baseUrl}auth/signup`,payload)
  }
}
