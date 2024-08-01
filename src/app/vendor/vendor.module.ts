import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorRegisterComponent } from './components/vendor-register/vendor-register.component';
import { MaterialModule } from '../../mat/mat.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { VendorLoginComponent } from './components/vendor-login/vendor-login.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';

@NgModule({
  declarations: [VendorRegisterComponent, VendorLoginComponent, VendorDashboardComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class VendorModule {}