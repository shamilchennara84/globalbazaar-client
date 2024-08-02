import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vendor-nav',
  templateUrl: './vendor-nav.component.html',
  styleUrl: './vendor-nav.component.scss',
})
export class VendorNavComponent {
  constructor(private auth: AuthService) {}
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.auth.vendorlogout();
      }
    });
  }
}
