import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../auth/login/login-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private cookie: CookieService, private login:LoginService) {
     if (this.login.userData.getValue() !== null) {
      this.getCartProducts().subscribe({
      next:(res)=>{
        this.cartNumber.next(res.numOfCartItems)
      }
    })
     }
  }

  addProductToCart(ProductId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}cart`, {
      productId: ProductId
    })
  }

  getCartProducts(): Observable<any> {
    return this.http.get(`${environment.baseUrl}cart`)
  }

  updateProductCart(count: number, productId: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}cart/${productId}`, {
      count: count
    })
  }

  deleteProductCart(ProductId: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cart/${ProductId}`)
  }

  clarCart(): Observable<any> {
    return this.http.delete(`${environment.baseUrl}cart`)
  }

  checkOutSession(id:string | null, data:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}orders/checkout-session/${id}?url=http://localhost:4200`,data)
  }

}

