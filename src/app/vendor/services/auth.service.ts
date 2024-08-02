import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  IVendor,
  IVendorSignInResponse,
  IVendorSignupResponse,
} from '../model/vendor.model';
import { map, Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.vendorApiURL;

  constructor(private http: HttpClient, private router: Router,private tokenService:TokenService) {}

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
          localStorage.setItem('vendortoken', response.token);
          return response;
        })
      );
  }

  vendorlogout() {
    localStorage.removeItem('vendortoken');
    this.router.navigate(['/vendor']);
  }
  isVendorLoggedIn(): boolean {
    return this.tokenService.isVendorAndValidToken();
  }
}
