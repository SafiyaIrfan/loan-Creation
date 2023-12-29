import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { states, customerStatus,organizationLevel} from 'src/app/pages/modules/loan-creation/Static data/static';
import { customerType,taxCategory } from 'src/app/pages/modules/loan-creation/Static data/static';
import { AppConstants } from 'src/app/core/globals/app-constants';
import { DirectiveModule } from 'src/app/shared/directive/directive.module';

@Component({
  selector: 'app-search-customer-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgbCollapseModule, MaterialModule, DirectiveModule],
  templateUrl: './search-customer-list.component.html',
  styleUrls: ['./search-customer-list.component.scss']
})
export class SearchCustomerListComponent {
  form: FormGroup;
  states:any[]=[];
  customerStatus:any=[]=[];

  isCollapsed: boolean = true;
  organizationLevel:any[]=[];
  customerType: any[] = [];
  taxCategory: any[] = [];

  constructor(private _formBuilder: FormBuilder, private _appConstants: AppConstants,) {
    this.form = this._formBuilder.group({
      customerName: ['', Validators.required,],
      mobileNumber: ['', [Validators.required, Validators.pattern(this._appConstants.VALID_MOBILE_NUMBER)]],
      houseName: ['', Validators.required],
      crmCode: ['', Validators.required],
      customerCode: ['', Validators.required],
      customerType: ['', Validators.required],
      taxCategory: ['', Validators.required],
      road: ['', Validators.required],
      mPowerCard: ['', Validators.required],
      state: ['', Validators.required],
      privileageCard: ['', Validators.required],
      customerStatus: ['1', Validators.required],
      organizationLevel: ['1', Validators.required],
      organizationUnit: ['', Validators.required],
      organizationCode: ['', Validators.required],
      outstandingLoans: ['', Validators.required],
      pan: ['', [Validators.required, Validators.pattern(this._appConstants.VALID_PAN)]],
    });
  }

  ngOnInit() {
    this.states=states;
    this.customerStatus=customerStatus;
    this.organizationLevel=organizationLevel;
    this.customerType=customerType;
    this.taxCategory=taxCategory
    this.customerType = customerType;
    this.taxCategory = taxCategory
    this.forms['organizationLevel'].disable();
  }

  get forms() {
    return this.form.controls;
  }
}
