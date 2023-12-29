import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanCreationComponent } from './loan-creation/loan-creation.component';
import { GoldInfoComponent } from './gold-info/gold-info.component';
import { OtherInfoComponent } from './other-info/other-info.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

const routes: Routes = [
  {
    path:"loans",
    component:LoanCreationComponent
  },

  {
    path:"goldinfo",
    component:GoldInfoComponent
  },
  {
    path:"other",
    component:OtherInfoComponent
  },
  {
    path:"payment",
    component:PaymentDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanCreationRoutingModule { }
