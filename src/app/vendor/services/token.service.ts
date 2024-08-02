import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedJWT } from '../../core/models/decodedJWT.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isVendorAndValidToken(): boolean {
    const token = localStorage.getItem('vendortoken');
    if (!token) {
      return false;
    }

    try {
      const decodedToken: DecodedJWT = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        this.removeVendorToken();
        return false;
      }

      if (decodedToken.role === 'vendor') {
        return true;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }

    this.removeVendorToken();
    return false;
  }

  removeVendorToken() {
    localStorage.removeItem('vendortoken');
  }
}
