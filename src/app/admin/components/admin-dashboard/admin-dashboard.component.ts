import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../../services/admin.service';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { IVendor } from '../../model/vendor.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  displayedColumns: string[] = [
    'username',
    'companyName',
    'email',
    'phone',
    'action',
  ];

  filterInput = '';

  vendorList: IVendor[] = [];
  dataSource = new MatTableDataSource<IVendor>(this.vendorList);
  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService, // Use vendor service
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchVendors();
  }

  fetchVendors() {
    const vendorSubscription = this.adminService
      .getAllVendor()
      .subscribe((vendors) => {
        this.vendorList = vendors;
        console.log(this.vendorList);
        this.dataSource = new MatTableDataSource(this.vendorList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.subscriptions.push(vendorSubscription);
  }

  applyFilters() {
    const filteredData = this.vendorList.filter((vendor) => {
      return (
        vendor.companyName
          .toLowerCase()
          .includes(this.filterInput.toLowerCase()) ||
        vendor.email.toLowerCase().includes(this.filterInput.toLowerCase())
      );
    });

    this.dataSource.data = filteredData;
  }

  verifyVendor(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to verify this vendor!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, verify it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.verifyVendorById(id).subscribe({
          next: () => {
            this.toastr.success('Vendor verified successfully!', 'Success');
            this.fetchVendors();
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error('Failed to verify vendor.', 'Error');
          },
        });
      }
    });
  }

  toggleBlockStatus(id: string, isBlocked: boolean) {
   console.log(isBlocked);
    const actionLabel = isBlocked ? 'Unblock' : 'Block';
    const actionText = actionLabel==='Block'
      ? 'You are about to block this vendor!'
      : 'You are about to unblock this vendor!';
    const buttonText =
      actionLabel === 'Block' ? 'Yes, block it!' : 'Yes, unblock it!';

    Swal.fire({
      title: 'Are you sure?',
      text: actionText,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: buttonText,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.blockVendorById(id).subscribe({
          next: () => {
            this.toastr.success(
              `Vendor ${
                actionLabel === 'Block' ? 'blocked' : 'unblocked'
              } successfully!`,
              'Success'
            );
            this.fetchVendors();
          },
          error: (error: HttpErrorResponse) => {
            this.toastr.error('Failed to update vendor status.', 'Error');
          },
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
