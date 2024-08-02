import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.vendorApiURL;
  constructor(private http: HttpClient) {}

  createProduct(formData: FormData): Observable<any> {
    console.log(formData);
    return this.http.post<any>(`${this.apiUrl}/Product`, formData);
  }
}
