import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IVendor } from '../model/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.adminApiURL;
  constructor(private http: HttpClient) {}

  getAllVendor(): Observable<IVendor[]> {
    return this.http
      .get<IVendor[]>(`${this.apiUrl}/vendors`)
      .pipe(map((response) => response));
  }

  blockVendorById(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/vendors/${id}/block`, {}).pipe(
      map(() => {
        console.log(`Vendor with ID ${id} blocked successfully.`);
      }),
      catchError((error) => {
        console.error('Failed to block vendor:', error);
        return of();
      })
    );
  }
  verifyVendorById(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/vendors/${id}/verify`, {}).pipe(
      map(() => {
        console.log(`Vendor with ID ${id} verified successfully.`);
      }),
      catchError((error) => {
        console.error('Failed to verify vendor:', error);
        return of();
      })
    );
  }
}
