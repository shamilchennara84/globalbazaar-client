import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorRegisterComponent } from './components/vendor-register/vendor-register.component';
import { MaterialModule } from '../../mat/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorLoginComponent } from './components/vendor-login/vendor-login.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { VendorNavComponent } from './shared/vendor-nav/vendor-nav.component';
import { AddProductComponent } from './components/add-product/add-product.component';

@NgModule({
  declarations: [VendorRegisterComponent, VendorLoginComponent, VendorDashboardComponent, VendorNavComponent, AddProductComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class VendorModule {}