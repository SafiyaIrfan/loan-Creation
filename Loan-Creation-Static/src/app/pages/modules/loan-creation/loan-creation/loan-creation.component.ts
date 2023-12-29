import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { duration, natureOfLoan, payment, productType, purposeName, schemeNames, selectCategory, selectSubCategory } from '../Static data/static';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CollapsileDataService } from 'src/app/core/services/collapsile-data.service';
import Swal from 'sweetalert2';
import { GoldInfoComponent } from '../gold-info/gold-info.component';
import { OtherInfoComponent } from '../other-info/other-info.component';
import { PaymentDetailsComponent } from '../payment-details/payment-details.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { paymentMode } from '../Static data/static';
import { ownerShipOfGold } from '../Static data/static';
import { possessedBy } from '../Static data/static';
import { ownerRelation } from '../Static data/static';
import { supplierData } from '../Static data/static';
import { packetData } from '../Static data/static';
import { LocalStorageService } from 'src/app/core/services/loan-data.service';
import { CustomerSearchComponent } from 'src/app/pages/customer-search/customer-search.component';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchDropdownComponent } from 'src/app/stand-alones/search-dropdown/search-dropdown.component';



@Component({
  selector: 'app-loan-creation',
  templateUrl: './loan-creation.component.html',
  styleUrls: ['./loan-creation.component.scss']
})
export class LoanCreationComponent {
  isCollapse1: boolean = false;
  activeStepIndex: number = 0;
  isCollapsed: boolean = true;
  productName: any[] = [];
  schemeName: any[] = [];
  purposeName: any[] = [];
  natureOfLoan: any[] = [];
  category: any[] = [];
  subCategory: any[] = [];
  durationType: any[] = [];
  paymentBasis: any[] = [];
  loanform: FormGroup;
  isLinear = false;
  submitted = false;
  panelOpenState = false;
  currentDate: Date;
  productControl!: FormControl;
  length: any
  filteredProductType: any;
  selectedIndex = 0
  showDetails: any
  paymentModes: any
  ownershipDetails: any
  packetData: any
  possedBy: any
  relation: any
  supplierData: any
  customerId: any
  customerName: any
  customerImage: any
  customerAddress: any
  customerContact: any
  customerSelected: any
  uniqueId: any
  hasNonEmptyGoldImage: boolean = false
  productArray: any[] = []
  hasWarning: boolean = false
  counter: any
  isLoanFormValid: boolean = true
  receivedRequestAmount: any;
  public openMenu: boolean = false;
  @ViewChild('productTypeModel') productTypeModel!: SearchDropdownComponent;
  @ViewChild('goldForm') goldDetails1!: GoldInfoComponent;
  @ViewChild('goldForm') goldLoanForm!: GoldInfoComponent;
  @ViewChild('otherInfo') otherInfo!: OtherInfoComponent;
  @ViewChild('paymentDetails') paymentDetails!: PaymentDetailsComponent;
  @ViewChild('detailsSection') detailsSection!: ElementRef;
  productTypeData: any;


  constructor(private _formBuilder: FormBuilder,
    private _collapsibleDataService: CollapsileDataService,
    private cdref: ChangeDetectorRef, private toastr: ToastrService,
    private _router: Router,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    public dialog: MatDialog, private ngbModal: NgbModal,
  ) {
    this.loanform = this._formBuilder.group({
      productType: ['', Validators.required,],
      schemeName: ['',],
      purposeName: [{ value: '', disabled: true }, Validators.required,],
      natureLoan: [{ value: '', disabled: true }, Validators.required,],
      selectCategory: [{ value: '', disabled: true }, Validators.required,],
      selectSubCategory: [{ value: '', disabled: true }, Validators.required,],
      // Date: ['', Validators.required,],
      // orderId: ['', Validators.required,],
      // customerName: ['', Validators.required],
      // paymentbasis: [{ value: '', disabled: true }, Validators.required,],
      // activeLoans: ['', Validators.required,],
      // duration: [{ value: '', disabled: true }, Validators.required,],
      // TOMS: [{ value: '', disabled: true }, Validators.required,],
      // parentGl: [{ value: '', disabled: true }, Validators.required,],
      // formNumber: ['', Validators.required,],
      // outstandingLoans: ['', Validators.required,],
    });
    this.currentDate = new Date();
    this.loanform.valueChanges.subscribe((formData) => {
      if (this.loanform.valid) { }
    })
    this._collapsibleDataService.setFormData(this.form);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {
    if (!this.detailsSection?.nativeElement?.contains(event.target)) {
      this.showDetails = false;
    }
  }

  clickMenu() {
    this.openMenu = !this.openMenu;
  }

  myFunction(event: Event) {
    event.stopPropagation();
    this.showDetails = !this.showDetails;
  }



  //Activating Next step
  nextStep() {
    this.activeStepIndex++;
  }
  //Activating previous step
  prevStep() {
    this.activeStepIndex--;
  }

  ngOnInit() {
    this.form["schemeName"].disable();
    this.customerSelected = this.localStorageService.getCustomerData();
    

    // this.customerSelected = this.localStorageService.getCustomer();
    if (!this.customerSelected) {
      this.toastr.warning('Choose a customer to add loan')
    }
    this.productName = productType;
    this.purposeName = purposeName;
    this.natureOfLoan = natureOfLoan;
    this.category = selectCategory;
    this.durationType = duration;
    this.paymentBasis = payment;
    this.paymentModes = paymentMode
    this.ownershipDetails = ownerShipOfGold
    this.packetData = packetData
    this.possedBy = possessedBy
    this.relation = ownerRelation
    this.supplierData = supplierData
    let customerDetails: any = sessionStorage.getItem("customer");
    customerDetails = JSON.parse(customerDetails);
    // this.form['customerName'].setValue(customerDetails?.customer_name);
    // this.form['activeLoans'].setValue(customerDetails?.active_loans);
    // this.form['outstandingLoans'].setValue(customerDetails?.outstanding_amt);
    // this.form['formNumber'].setValue(customerDetails?.form_no);
    this.showDetails = false;
    // setTimeout(() => {
    //   this.showDetails = false;
    // }, 3000);
    // for (let i = 0; i < this.productName.length; i++) {
    //   const obj = this.productName[i];
    //   this.productArray.push(obj.PTYPE_SHORT_NAME)
    // }
    this.productTypeData = {
      array: this.productName
    }
  }
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.showDetails = true; // Ensure that this executes after the view is initialized
  //   }, 0);
  // }
  ///changes on product change ||Ajay
  onOptionSelected(event: Event) {
    let data: any = event;
    // const resultObject = this.productName.find(item => item.PTYPE_SHORT_NAME === this.loanform.controls['productType'].value);
    this.schemeName = [];
    if (data != null && data !='' && data !=undefined) {
      const selectedPro: any = data.PROD_TYPEID;
      schemeNames.forEach(element => {
        if (element.PROD_TYPEID == Number(selectedPro)) { // Parse to number
          this.schemeName.push(element);
        }
      });
      // this.schemeName.length > 0 ? this.form["schemeName"].setValue(this.schemeName[0].SCHEMEID) : this.form["schemeName"].setValue('');
      if (this.schemeName.length > 0) {
        this.form["schemeName"].setValue(this.schemeName[0].SCHEMEID);
        this.form["schemeName"].enable();
      } else {
        // Swal.fire({
        //   text: 'No Scheme available for this product',
        //   icon: 'warning',
        //   confirmButtonColor: "#4747a1",
        // });
        this.toastr.warning('No Scheme available for this product', 'Info');
        this.form["schemeName"].setValue('');
        this.form["schemeName"].disable();
      }
      this.collapsibleDisableEnable();
    }
    this.form['purposeName'].enable();
    this.form['natureLoan'].enable();
    // this.form['purposeName'].setValue('');
    this.form['purposeName'].setValue('');
    // this.loanform.get('purposeName')?.setErrors(null);
    this.form['natureLoan'].setValue('');
    // this.loanform.get('natureLoan')?.setErrors(null);
    this.form['selectCategory'].setValue('');
    this.loanform.get('selectCategory')?.setErrors(null);
    this.form['selectSubCategory'].setValue('');
    this.loanform.get('selectSubCategory')?.setErrors(null);
    // this.form['orderId'].setValue('');
    // this.loanform.get('orderId')?.setErrors(null);
  }

  //Changes on  schemechange ||Ajay
  onSchemeChange() {
    this.collapsibleDisableEnable();
  }
  //Changes on  Purpose change ||Ajay
  onPurposeChange() {
    let businessId = this.loanform.get('purposeName')?.value;
    if (businessId == 1) {
      this.form['selectCategory'].enable();
      this.form['selectSubCategory'].disable();
      Swal.fire({
        icon: 'info',
        text: 'Please  select  category and sub-category.',
        confirmButtonColor: "#4747a1"
      });
      this.loanform.get('selectCategory')?.markAllAsTouched();
      // this.loanform.get('selectSubCategory')?.markAllAsTouched();
    } else {
      this.form['selectCategory'].disable();
      this.form['selectSubCategory'].disable();
      this.form['selectSubCategory'].setValue('');
      this.form['selectCategory'].setValue('');
    }
  }


  //Enabling table on valid product and scheme ||Ajay
  collapsibleDisableEnable() {
    if (this.loanform.controls["schemeName"].valid && this.loanform.controls["productType"].valid) {
      Object.keys(this._collapsibleDataService.goldFormData.controls).forEach(key => {
        if (key == "enhRate" || key == "rate" || key == "eligibleAmt") {
          this._collapsibleDataService.goldFormData.get(key).disable();
        } else {
          this._collapsibleDataService.goldFormData.get(key).enable();
          this._collapsibleDataService.goldFormData.get(key).setValue('');
        }
      });
    }
    else {
      Object.keys(this._collapsibleDataService.goldFormData.controls).forEach(key => {
        this._collapsibleDataService.goldFormData.get(key).disable();
        this._collapsibleDataService.goldFormData.get(key).setValue('');
      });
    }
  }


  //changes on selecting category ||Ajay
  onSelectedCategoryChange(event: Event) {
    // Clear any validation errors and mark the control as untouched

    this.subCategory = [];
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = event.target.value;
      selectSubCategory.forEach(element => {
        if (element.CATEGORY_ID == Number(selectedValue)) {
          this.subCategory.push(element);
        } else {
          this.subCategory = selectSubCategory
        }
      });
      // Set the value of the `selectSubCategory` form control to `null`.
      this.loanform.controls['selectSubCategory'].setValue(null);
      // Re-enable the `selectSubCategory` form control.
      this.loanform.controls['selectSubCategory'].enable();
      this.loanform.controls['selectSubCategory'].markAsTouched();
    }
  }

  //get all  form controls ||Ajay
  get form() {
    return this.loanform.controls;
  }

  //Sweet alert on Save click ||Cuckoo
  onSaveAlert() {
    this.submitted = true;
    this.checkImage()
    if (this.counter == 0) {
      this.setTabcontrol()
      this.selectedIndex = 0
      this.submitted = false
      return
    }
    if (this.hasNonEmptyGoldImage) {
      this.setTabcontrol()
      this.submitted = false
      return
    }
    // if (this.receivedRequestAmount == undefined || this.receivedRequestAmount == "") {
    //   this.setTabcontrol()
    //   this.selectedIndex = 0
    //   this.submitted = false
    //   return
    // }
    let x: any = localStorage.getItem("length");
    let tableLength = parseInt(x)
    this.setTabcontrol()
    if (this.paymentDetails.otherLoanInfo.valid && this.otherInfo.otherInfoForm.valid && this.isLoanFormValid && this.goldLoanForm.requestedAmount.valid) {
      // //Storing new loan created details to local storage ||Sajana
      // const foundMode = this.paymentModes.find((mode: { PAYMENT_MODE_ID: number; }) => mode.PAYMENT_MODE_ID === parseInt(this.paymentDetails.otherLoanInfo.value.paymentMode, 10));
      // const foundOwnership = this.ownershipDetails.find((mode: { id: number; }) => mode.id === parseInt(this.otherInfo.otherInfoForm.value.ownerShipOfGold, 10));
      // const foundPacket = this.packetData.find((mode: { id: number; }) => mode.id === parseInt(this.otherInfo.otherInfoForm.value.packet, 10));
      // const foundPossession = this.possedBy.find((mode: { id: number; }) => mode.id === parseInt(this.otherInfo.otherInfoForm.value.possessedBy, 10));
      // const relation = this.relation.find((mode: { id: number; }) => mode.id === parseInt(this.otherInfo.otherInfoForm.value.relationShipWith, 10));
      // const supplyData = this.supplierData.find((mode: { id: number; }) => mode.id === parseInt(this.otherInfo.otherInfoForm.value.serialNo, 10));
      const productData = this.productName.find((mode: { PROD_TYPEID: number; }) => mode.PROD_TYPEID === parseInt(this.loanform.controls['productType'].value.PROD_TYPEID, 10));
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
      const uniqueId = `id_${timestamp}`;
      let customerData = this.localStorageService.getDataFromLocalStorage()
      let customerId = this.customerSelected.crm_code;

      let foundObject = customerData.find(customer => customer.crm_code == customerId);
      if (foundObject) {
        foundObject.ActiveLoans.id.unshift('0012/4789/2023' + '(' + productData.PTYPE_SHORT_NAME
          + ')')
      };
      this.localStorageService.saveDataToLocalStorage(customerData);
      if (tableLength === 0) {
        this.toastr.error('Please add gold or item details !')
        this.selectedIndex = 0;
        this.submitted = false
      }
      else if (tableLength > 0) {
        Swal.fire({
          text: 'Loan created successfully',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: "#4747a1",
          // cancelButtonColor: "#d33",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        }).then((_result: any) => {
          this.toRestAllFromData();
          // this.goldInfo.goldLoanForm.reset();
          // localStorage.clear()
        });
      }
    }

    else {
      this.toastr.error('Please fill all required fileds !')
      this.submitted = false
    }
  }

  generateUniqueId(): void {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.padZero(currentDate.getMonth() + 1);
    const day = this.padZero(currentDate.getDate());

    // Assuming you want a random 4-digit number
    const randomPart1 = this.getRandomNumber(1000, 9999);
    const randomPart2 = this.getRandomNumber(1000, 9999);

    this.uniqueId = `${randomPart1}/${randomPart2}/${year}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  customerSearch() {
    this.toRestAllFromData()
    const dialogRef = this.dialog.open(CustomerSearchComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['animate__animated', 'animate__fadeInDown'],
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.data) {
        this.customerSelected = res.data
      }
    })

  }

  toRestAllFromData() {
    this.paymentDetails.otherLoanInfo.reset();
    this.otherInfo.otherInfoForm.reset();
    this.loanform.reset();
    this.goldLoanForm.goldDetails = '';
    this.goldLoanForm.goldDetails1=[];
    this.goldDetails1.totalGoldGrossWt = 0;
    this.goldDetails1.totalNetGrossWt = 0;
    this.goldDetails1.totalEligibleAmt = 0;
    this.goldDetails1.approvedAmount = 0;
    this.goldDetails1.totalEligibleAmt = 0;
    this.goldDetails1.charges =20.00;
    this.goldDetails1.netAmount = 0;
    this.goldDetails1.requestedAmount.setValue("");
    this.goldDetails1.requestedAmount.disable();
    this.loanform.controls['productType'].setValue('');
    this.paymentDetails.approvedAmount = 0;
    this.paymentDetails.netAmount = 0;
    this.paymentDetails.eligibleAmount = 0;
    this.paymentDetails.charges = 0;
    this.goldDetails1.imgUrl = '';
    this.productTypeModel.selectedValue = '';
  }

  // receivedMessageHandler(data: any) {
  //   this.receivedRequestAmount = data;
  // }

  private setTabcontrol() {
    this.loanform.markAllAsTouched();
    this.checkFormValidityAndSetIndex()
    this.paymentDetails.otherLoanInfo.markAllAsTouched();
    this.otherInfo.otherInfoForm.markAllAsTouched();
    this.goldLoanForm.requestedAmount.markAsTouched()
    if (this.goldDetails1.goldDetails1.length == 0) {
      this.goldDetails1.goldLoanForm.markAllAsTouched()
      if (this.goldDetails1.goldLoanForm.invalid) {
        this.selectedIndex = 0;
        this.submitted = false
      }
    }
    if (this.goldLoanForm.requestedAmount.invalid) {
      this.selectedIndex = 0;
      this.submitted = false
    }
    else if (this.otherInfo.otherInfoForm.invalid) {
      this.selectedIndex = 1;
      this.submitted = false
    }
    else if (this.paymentDetails.otherLoanInfo.invalid) {
      this.selectedIndex = 2;
      this.submitted = false
    }


  }
  //Gold Image Validation ||Sajana
  checkImage() {
    this.counter = 0;
    for (let i = 0; i < this.goldDetails1.goldDetails1.length; i++) {
      const obj = this.goldDetails1.goldDetails1[i];
      if (obj.gold_image !== "") {
        this.counter++;
      }
    }
    if (this.goldDetails1.goldDetails1.length == 0) {
      this.toastr.warning('Add atleast one row to proceed to next step')
      this.selectedIndex = 0
      this.submitted = false
    } else if (this.goldDetails1.goldDetails1.length > 0) {
      if (this.counter == 0) {
        this.toastr.warning('Add atleast one image to proceed to next step')
        this.selectedIndex = 0
        this.submitted = false
      }
      // else if (this.receivedRequestAmount == undefined || this.receivedRequestAmount == "") {

      //   this.toastr.warning('Please fill requested amount field')
      //   this.selectedIndex = 0
      //   this.submitted = false
      // }
      else if (!this.submitted) {
        this.selectedIndex = 1
      }
    }

  }

  onTabChanged(event: any) {
    this.selectedIndex = event.index
  }

  //loan form validation ||Sajana
  checkFormValidityAndSetIndex() {
    this.isLoanFormValid = true;

    Object.keys(this.loanform.controls).forEach(controlName => {
      const control = this.loanform.get(controlName);

      if (control && control.status !== 'VALID' && control.status !== 'DISABLED') {
        this.isLoanFormValid = false;
      }
    });
  }

}
