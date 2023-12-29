import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeCustomizerComponent } from './theme-customizer/theme-customizer.component';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { LoginComponent } from '../account/login/login.component';
import { authGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: "theme",
    component: ThemeCustomizerComponent
  },
  {
    path: "",
    component: LoginComponent,
     canActivate: [authGuard]
  },
  {
    path: "customer-listing",
    component: CustomerListingComponent,
    canActivate: [authGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }


