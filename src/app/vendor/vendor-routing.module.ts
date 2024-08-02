import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorRegisterComponent } from './components/vendor-register/vendor-register.component';
import { VendorLoginComponent } from './components/vendor-login/vendor-login.component';
import { VendorDashboardComponent } from './components/vendor-dashboard/vendor-dashboard.component';
import { vendorAuthGuard } from './guards/vendor-auth.guard';
import { vendorLoggedGuard } from './guards/vendor-logged.guard';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'register',
    component: VendorRegisterComponent,
    canActivate: [vendorLoggedGuard],
  },
  {
    path: 'login',
    component: VendorLoginComponent,
    canActivate: [vendorLoggedGuard],
  },
  {
    path: 'dashboard',
    component: VendorDashboardComponent,
    canActivate: [vendorAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
