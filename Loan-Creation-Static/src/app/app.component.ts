import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerSearchComponent } from './pages/customer-search/customer-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'velzon';

  constructor(public dialog: MatDialog) { }

  

  customerSearch() {
    const dialogRef = this.dialog.open(CustomerSearchComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['animate__animated', 'animate__fadeInDown',],
    });


  }
}
