import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IAdmin, IAdminSignInResponse } from '../model/admin.model';
import { map, Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.adminApiURL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  adminSignIn(credentials: IAdmin): Observable<IAdminSignInResponse> {
    return this.http
      .post<IAdminSignInResponse>(`${this.apiUrl}/signin`, credentials)
      .pipe(
        map((response) => {
          localStorage.setItem('admintoken', response.token);
          return response;
        })
      );
  }

  adminlogout() {
    localStorage.removeItem('admintoken');
    this.router.navigate(['/admin']);
  }
  isAdminLoggedIn(): boolean {
    return this.tokenService.isAdminAndValidToken();
  }
}
