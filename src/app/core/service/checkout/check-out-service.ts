import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  constructor(private http: HttpClient, private cookie: CookieService) { }


  checkOutSession(shoppingAddress: any, cartId:string | null): Observable<any> {
    return this.http.post(`${environment.baseUrl}orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddress: shoppingAddress
    }, {
      headers: { token: this.cookie.get('token') }
    })
  }


  payCash(shoppingAddress: any, cartId:string): Observable<any> {
    return this.http.post(`${environment.baseUrl}orders/${cartId}`, {
      shippingAddress: shoppingAddress
    }, {
      headers: { token: this.cookie.get('token') }
    })
  }
  
}


