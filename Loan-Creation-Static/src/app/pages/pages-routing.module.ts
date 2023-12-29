import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/account/login/login.component';
import { LayoutComponent } from '../layouts/layout.component';
import { authGuard } from '../core/guards/auth.guard';
// Component page
const routes: Routes = [
  {
    path: "",
    component: LoginComponent,

  },
  {
    path: 'settings', component: LayoutComponent, loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule,), canActivate: [authGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
