import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule
  ]
})
export class DashboardModule { }
