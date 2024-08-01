import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {  IVendor, IVendorSignInResponse, IVendorSignupResponse } from '../model/vendor.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.vendorApiURL;

  constructor(private http: HttpClient, private router: Router) {}

  signupVendor(credentials: IVendor): Observable<IVendorSignupResponse> {
    return this.http
      .post<IVendorSignupResponse>(`${this.apiUrl}/signup`, credentials)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  signInVendor(credentials: IVendor): Observable<IVendorSignInResponse> {
    return this.http
      .post<IVendorSignInResponse>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}


