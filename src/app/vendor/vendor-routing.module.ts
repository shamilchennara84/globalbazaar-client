import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorRegisterComponent } from './components/vendor-register/vendor-register.component';
import { VendorLoginComponent } from './components/vendor-login/vendor-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component:VendorRegisterComponent },
  { path: 'login', component:VendorLoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
