import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../core/models/product.model';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent implements OnInit,OnDestroy {
  productList: IProduct[] = [];
  subscriptions: Subscription[] = [];
  url = environment.staticApiURL;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchProdcuctByVendor();
  }

  fetchProdcuctByVendor() {
    const productSubscription = this.productService
      .fetchProducts()
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

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
