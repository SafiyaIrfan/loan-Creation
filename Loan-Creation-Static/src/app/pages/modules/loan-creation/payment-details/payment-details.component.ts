import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { paymentMode } from '../Static data/static';
import { bankDetails } from '../Static data/static';
import { AppConstants } from 'src/app/core/globals/app-constants';
import { CollapsileDataService } from 'src/app/core/services/collapsile-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent {
  tooltipText:string="Stamp Charge rupees 10"
  tooltiptext:string="Service Tax rupees 10"
  otherLoanInfo!: FormGroup
  submitted: boolean = false;
  paymentMode: any[] = [];
  bankDetails: any[] = [];
  goldDataSubscribe: any;
  goldDetails: any;
  netAmount: any = 0;
  eligibleAmount: any = 0;
  charges: any = 0;
  approvedAmount: any = 0;
  paymentId: any;
  tooltip: boolean = false;

  // @ViewChild('firstInputField') firstInputField!: ElementRef;

  constructor(private formBuilder: FormBuilder,
    private _appConstants: AppConstants,
    private _collapsibleDataService: CollapsileDataService,
    private _router: Router,
    private renderer: Renderer2
  ) {
    this.otherLoanInfo = this.formBuilder.group({
      // reqAmount: new FormControl('', [Validators.required,]),
      // approveAmount: new FormControl('', [Validators.required,]),
      // approveBy: new FormControl('', [Validators.required,]),
      paymentMode: new FormControl('', [Validators.required]),
      bank: new FormControl({ value: '', disabled: true }, [Validators.required]),
      accNumber: new FormControl('', [Validators.required, Validators.pattern(this._appConstants.VALID_BANK_ACC_NU)]),
      ifscCode: new FormControl('', [Validators.required, Validators.pattern(this._appConstants.IFSC_REG_EXPRESSION)]),
      branch: new FormControl('', [Validators.required]),
      cash: new FormControl('', [Validators.required]),
    });
  }

  // ngAfterViewInit() {
  //   this.renderer.selectRootElement(this.firstInputField.nativeElement).focus();
  // }

  ngOnInit() {
    this.paymentMode = paymentMode;
    this.bankDetails = bankDetails;
    this.goldDataSubscribe = this._collapsibleDataService.goldDataSubject.subscribe(
      (goldDetails) => {
        this.goldDetails = goldDetails;
        this.calculateTotalAmounts();
      }
    );
    this.otherLoanInfo.controls['bank'].disable();
    this.otherLoanInfo.controls['accNumber'].disable();
    this.otherLoanInfo.controls['ifscCode'].disable();
    this.otherLoanInfo.controls['cash'].disable();
    this.otherLoanInfo.controls['branch'].disable();
  }

  //Fetch net amount ,approved amount,eligible amount ||Ajay
  calculateTotalAmounts() {
    this.approvedAmount = this.goldDetails.approvedAmount;
    this.netAmount = this.goldDetails.netAmount;
    this.eligibleAmount = this.goldDetails.eligibleAmount;
    this.charges = this.goldDetails.charges;
  }

 
  //Changes on entering Ifsc code || Cuckoo
  // onChangeIfscCode() {
  //   let array = this.bankDetails.find(e => e.ifscCode == this.otherLoanInfo.controls['ifscCode'].value).branchName;
  //   this.otherLoanInfo.controls['branch'].setValue(array);
  // }
  //Changes on entering Bank details ||Cuckoo
  onChangeBank() {
    if (this.otherLoanInfo.controls['bank'].value != "") {
      this.otherLoanInfo.controls['branch'].enable();
    } else {
      this.otherLoanInfo.controls['branch'].disable();
    }
    this.otherLoanInfo.controls['ifscCode'].setValue('');
    this.otherLoanInfo.controls['branch'].setValue('');
    this.otherLoanInfo.controls['accNumber'].setValue('');

  }

  //Changes on entering different payment modes ||Ajay
  onChangePayment() {
    this.paymentId = this.otherLoanInfo.get('paymentMode')?.value;
    if (this.paymentId == 62) { // direct credit
      this.otherLoanInfo.controls['bank'].markAsTouched();
      this.otherLoanInfo.controls['bank'].enable();
      this.otherLoanInfo.controls['accNumber'].enable();
      this.otherLoanInfo.controls['ifscCode'].enable();
      this.otherLoanInfo.controls['branch'].disable();
      this.otherLoanInfo.controls['cash'].enable();
    }
    else if (this.paymentId == 48) { //bank,cheque
      this.otherLoanInfo.controls['bank'].markAsTouched();
      this.otherLoanInfo.controls['bank'].enable();
      this.otherLoanInfo.controls['accNumber'].enable();
      this.otherLoanInfo.controls['ifscCode'].enable();
      this.otherLoanInfo.controls['branch'].disable();
      this.otherLoanInfo.controls['cash'].disable();
    }
    else if (this.paymentId == 47 || this.paymentId == 64) { //imt and cash
      this.otherLoanInfo.controls['bank'].disable();
      this.otherLoanInfo.controls['accNumber'].disable();
      this.otherLoanInfo.controls['ifscCode'].disable();
      this.otherLoanInfo.controls['branch'].disable();
      this.otherLoanInfo.controls['cash'].enable();
    }
    else if (this.paymentId == ""){
      this.otherLoanInfo.controls['branch'].disable();
      this.otherLoanInfo.controls['bank'].disable();
    }
      this.otherLoanInfo.controls['bank'].setValue('');
    this.otherLoanInfo.controls['accNumber'].setValue('');
    this.otherLoanInfo.controls['ifscCode'].setValue('');
    this.otherLoanInfo.controls['branch'].setValue('');
    this.otherLoanInfo.controls['cash'].setValue('');
  }

}
