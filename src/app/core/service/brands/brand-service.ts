import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private http: HttpClient) { }

  getBrands(): Observable<any> {
    return this.http.get(`${environment.baseUrl}brands`)
  }

  getSpecificBrand(id: string | null): Observable<any> {
    return this.http.get(`${environment.baseUrl}brands/${id}`)
  }


}
