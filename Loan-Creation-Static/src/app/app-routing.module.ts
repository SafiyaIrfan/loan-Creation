import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { authGuard } from './core/guards/auth.guard';
import { CustomerListingComponent } from './pages/modules/settings/customer-listing/customer-listing.component';
import { LoginComponent } from './pages/modules/account/login/login.component';

const routes: Routes = [
  
  { path: '', loadChildren: () => import('./pages/modules/account/account.module').then(m => m.AccountModule), canActivate: [authGuard] },
  { path: 'settings', component: LayoutComponent, loadChildren: () => import('./pages/modules/settings/settings.module').then(m => m.SettingsModule), canActivate: [authGuard] },
  { path: 'pages', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [authGuard] },
  { path: 'home', component: LayoutComponent, loadChildren: () => import('./pages/modules/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard] },
  { path: 'loan', component: LayoutComponent, loadChildren: () => import('./pages/modules/loan-creation/loan-creation.module').then(m => m.LoanCreationModule), canActivate: [authGuard] },
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "listing",
    component: CustomerListingComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
