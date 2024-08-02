import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../../core/models/product.model';
import { Subscription } from 'rxjs';
import { VendorService } from '../../services/vendor.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AddProductComponent } from '../add-product/add-product.component';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.scss',
})
export class VendorDashboardComponent implements OnInit, OnDestroy {
  productList: IProduct[] = [];
  subscriptions: Subscription[] = [];
  url = environment.staticApiURL

  constructor(
    private vendorService: VendorService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchProdcuctByVendor();
  }

  fetchProdcuctByVendor() {
    const productSubscription = this.vendorService
      .getProductsByVendor()
      .subscribe({
        next: (products) => {
          this.productList = products;
          console.log(this.productList);
        },
        error: (err: HttpErrorResponse) => {
          let errorMessage = 'Sign-in failed. Please try again.';
          if (err && err.error) {
            errorMessage = err.error.message;
          }
          this.toastr.error(errorMessage, 'Error');
        },
      });
    this.subscriptions.push(productSubscription);
  }
  createProduct() {
    const popup = this.dialog.open(AddProductComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      height: '90%',
    });
    popup.afterClosed().subscribe(() => {
       this.fetchProdcuctByVendor();
    });
  }
  

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
