import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerSearchComponent } from 'src/app/pages/customer-search/customer-search.component';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  public openMenu: boolean = false;
  clickMenu() {
    this.openMenu = !this.openMenu;
  }
  constructor(public dialog: MatDialog,private _router: Router,) { }

  customerSearch() {
    this._router.navigate(["./home/dashboard"]);
    const dialogRef = this.dialog.open(CustomerSearchComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['animate__animated', 'animate__fadeInDown',],
    });


  }
}
