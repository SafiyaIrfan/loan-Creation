import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { customerDetails } from '../../loan-creation/Static data/static';

@Component({
  selector: 'app-customer-listing',
  templateUrl: './customer-listing.component.html',
  styleUrls: ['./customer-listing.component.scss']
})

export class CustomerListingComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  customerDetails: any[] = [];

  constructor(private _router: Router) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Tables' },
      { label: 'Basic Tables', active: true }
    ];
    this.customerDetails = customerDetails;
  }

  /**
   * Show Code Toggle
   */
  ShowCode(event: any) {
    let card = event.target.closest('.card');
    const preview = card.children[1].children[1];
    const codeView = card.children[1].children[2];
    if (codeView != null) {
      codeView.classList.toggle('d-none');
    }
    if (preview != null) {
      preview.classList.toggle('d-none');
    }
  }
  
  onCustomerClick(item: any) {
    sessionStorage.setItem('customer', JSON.stringify(item));
    this._router.navigate(["/loan/loans"]);
  }
}
