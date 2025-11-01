import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);

 

  getAllOrders(): Observable<any> {
    return this.http.get(`${environment.baseUrl}orders/`);
  }
  
}
