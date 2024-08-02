import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IProduct, IProductResponse } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private apiUrl = environment.vendorApiURL;

  constructor(private http: HttpClient, private router: Router) {}

  getProductsByVendor(): Observable<IProduct[]> {
    const url = `${this.apiUrl}/products`;

    return this.http
      .get<IProductResponse>(url)
      .pipe(map((response) => response.products));;
  }
}
