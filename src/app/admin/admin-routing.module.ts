import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { adminLoggedGuard } from './guards/admin-logged.guard';
import { adminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: AdminLoginComponent,
    canActivate: [adminLoggedGuard],
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
