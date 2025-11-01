import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private http: HttpClient) { }
  dataList: WritableSignal<any[]> = signal([])



  addProductToWishlist(productId: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}wishlist`, { productId })
  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}wishlist/${id}`)
  }

  getLoggedUserWishlist(): Observable<any> {
    return this.http.get(`${environment.baseUrl}wishlist`)
  }
  getData() {
    this.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log('wishlist', res)
      this.dataList.set(res.data); 
      }
    })
  }



}
