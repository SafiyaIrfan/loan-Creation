import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { goldNature } from '../Static data/static';
import { itemDetailsArray } from '../Static data/static';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CollapsileDataService } from 'src/app/core/services/collapsile-data.service';
import { IGoldData } from 'src/app/core/models/gold-data';
import Swal from 'sweetalert2';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from '@angular/cdk/collections';
import { PreviewImageComponent } from './preview-image/preview-image.component';


@Component({
  selector: 'app-gold-info',
  templateUrl: './gold-info.component.html',
  styleUrls: ['./gold-info.component.scss']
})

export class GoldInfoComponent implements OnInit {
  @Input() stepperVar: any;
  @ViewChild('upload') upload: any;
  editingIndex: number | null = null;  //keep track of the index of the item being edited.
  showEditImage: boolean = false;
  goldNature: any[] = [];
  totalGoldGrossWt: number = 0;
  totalNetGrossWt: number = 0;
  // netGrossWeight: number = 0;
  goldLoanForm: FormGroup;
  rate: number = 0;
  charges: number = 20;
  eligibleAmount: number = 0;
  totalEligibleAmt: number = 0;
  requestedAmount = new FormControl('', Validators.required);
  itemDetailsArray: any[] = [];
  imgUrl: any = '';
  pageNo = new FormControl();
  totalActiveRows = 0;
  currentPage = 0;
  sortable = "customerName";
  direction = "desc";
  totalPage: number = 0;
  generatedActive = false;
  selection = new SelectionModel<IGoldData>(true, []);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  goldDetails!: any;
  goldDetails1!: IGoldData[];
  showImage: boolean = false;
  approvedAmount: any = 0;
  netAmount: any = 0;
  selectedValue: string = '';
  fieldBackgroundColor: string = '';
  addImage: boolean = false
  activeColumns: string[] = [
    "gold_checkBox",
    "sl_no",
    "gold_nature",
    "gold_item",
    "gold_no",
    "gold_grosswt",
    "gold_netwt",
    "gold_rate",
    "gold_enhrate",
    "gold_eligamt",
    "gold_image",
    "gold_remarks",
    "gold_id",
  ];
  stepperDataSubscribe: any;
  allSelected: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    private _collapsibleDataService: CollapsileDataService, public dialog: MatDialog,
  ) {
    this.goldLoanForm = this.formBuilder.group({
      nature: new FormControl({ value: '', disabled: true }, [Validators.required]),
      item: new FormControl({ value: '', disabled: true }, [Validators.required,]),
      no: new FormControl({ value: '', disabled: true }, [Validators.required]),
      grossWeight: new FormControl({ value: '', disabled: true }, [Validators.required,]),
      netWeight: new FormControl({ value: '', disabled: true }, [Validators.required,]),
      rate: new FormControl({ value: '', disabled: true }),
      enhRate: new FormControl({ value: '', disabled: true }),
      eligibleAmt: new FormControl({ value: '', disabled: true }),
      remarks: new FormControl({ value: '', disabled: true }),
    });
    this._collapsibleDataService.setGoldFormData(this.goldLoanForm);
  }

  //Function for clearing the requestedAmount || Ajay
  clrReqAmount() {
    this.requestedAmount.setValue("");
    this.approvedAmount = 0;
    this.netAmount = 0;
    this.calculateTotalGoldWt();
  }


  onInput(event: any) {
    // Check if the input has a value and set the background color accordingly.
    this.fieldBackgroundColor = 'white'
  }

  ngOnInit() {
    localStorage.setItem('length', JSON.stringify(0));
    this.goldNature = goldNature;
    this.getGoldDetails();
    this.calculateTotalGoldWt();
    this.stepperDataSubscribe = this._collapsibleDataService.goldDataSubject.subscribe(
      (stepperData) => {
        if (stepperData == 1) {
          this.onNext();
        }
      }
    );
    this.requestedAmount.disable();
    this.goldDetails1 = []
  }

  // Function for image preview || Midhunlal
  openImageView(imageUrl: any) {
    if (imageUrl) {
      const dialogRef = this.dialog.open(PreviewImageComponent, {
        width: '800px',
        height: 'auto',
        data: {
          imageUrl: imageUrl,
          showTitle: true
        }
      });
    }
  }

  refresh() {
    if (this.goldLoanForm.status == 'VALID' || this.goldDetails1.length) {
      this.goldLoanForm.reset()
      this.goldDetails = []
      this.goldDetails1 = []
    }
  }

  // Function for delete image ||Midhunlal
  deleteImg() {
    this.upload.nativeElement.value = '';
    this.imgUrl = '';
    this.showImage = false;
  }

  // Displaying the details from the array to the mattable || Ajay
  getGoldDetails() {
    this.totalActiveRows = itemDetailsArray.length > 0 ? itemDetailsArray.length || 0 : 0;
    this.getPageCount(this.totalActiveRows);
    this.goldDetails = new MatTableDataSource(itemDetailsArray) || new MatTableDataSource([]);
    this.goldDetails1 = itemDetailsArray;
    if (!this.generatedActive) {
      this.goldDetails.paginator = this.paginator;
      this.goldDetails.sort = this.sort;
      this.generatedActive = true;
    }
  }

  // Function for page count || Midhunlal
  getPageCount(totalCount: number) {
    if (totalCount > 0) {
      let activePageFloat = totalCount / 10;
      if (activePageFloat < 1) {
        this.totalPage = 1;
      } else {
        let quotient = Math.trunc(totalCount / 10);
        let remainder = totalCount % 10;
        if (remainder == 0) {
          this.totalPage = quotient;
        } else {
          this.totalPage = quotient + 1;
        }
      }
    }
  }

  // For getting the conrols of formgroup || cuckoo
  get form() {
    return this.goldLoanForm.controls;
  }

  // Function for  selcting the image type || Midhun
  onSelectFile(event: any) {

    if (event) {

      this.showImage = true;
      if (event.target.files && event.target.files[0]) {

        var reader = new FileReader();
        let fileData = event.target.files[0];

        if (fileData.type == 'image/jpeg' || fileData.type == 'image/jpg' || fileData.type == 'image/png') {
          reader.readAsDataURL(event.target.files[0]); // read file as data url
          reader.onload = (event) => { // called once readAsDataURL is completed
            this.imgUrl = event?.target?.result;
          }
        }
        else {
          Swal.fire({
            text: 'Please upload jpg/jpeg/png image !',
            icon: 'warning',
            allowOutsideClick: false,
            confirmButtonColor: "#4747a1"
          });
          this.showImage = false;
          return;
        }
      }
    }
    else {
      this.showImage = false;
    }

  }

  //On save the table details
  onSave() {

    if (this.goldLoanForm.valid) {
      let counter = 0

      if (this.editingIndex != null) {
        // Update the edited item  || Ajay
        const editedItem = this.goldDetails1[this.editingIndex]; // retrieves the item from the goldDetails array that corresponds to the index stored in editingIndex ||Ajay
        editedItem.gold_nature = this.form['nature'].value;
        editedItem.gold_item = this.form['item'].value;
        editedItem.gold_no = this.form['no'].value;
        editedItem.gold_grosswt = this.form['grossWeight'].value;
        editedItem.gold_netwt = this.form['netWeight'].value;
        editedItem.gold_rate = this.form['rate'].value;
        editedItem.gold_enhrate = this.form['enhRate'].value;
        editedItem.gold_eligamt = this.form['eligibleAmt'].value;
        editedItem.gold_remarks = this.form['remarks'].value;
        editedItem.gold_image = this.imgUrl ? this.imgUrl : '';
        this.goldDetails = new MatTableDataSource(this.goldDetails1) || new MatTableDataSource([]);
        this.showEditImage = false;
        this.showImage = false;
        this.calculateTotalGoldWt();
        this.editingIndex = null;  //After updating the item, the editingIndex is set back to null, indicating that the edit operation is complete. ||Ajay
        this.goldLoanForm.reset();
        this.form['nature'].setValue('');
      }
      else {
        // Add new data ||Cuckoo
        let newgolddata: any = {};
        let count = this.goldDetails1.length;
        localStorage.setItem('length', JSON.stringify(count + 1));
        newgolddata.sl_no = counter + 1;
        newgolddata.gold_id = count + 1;
        newgolddata.gold_nature = this.form['nature'].value;
        newgolddata.gold_item = this.form['item'].value;
        newgolddata.gold_no = this.form['no'].value;
        newgolddata.gold_grosswt = this.form['grossWeight'].value;
        newgolddata.gold_netwt = this.form['netWeight'].value;
        newgolddata.gold_rate = this.form['rate'].value;
        newgolddata.gold_enhrate = this.form['enhRate'].value;
        newgolddata.gold_eligamt = this.form['eligibleAmt'].value;
        newgolddata.gold_remarks = this.form['remarks'].value ? this.form['remarks'].value : 'N/A';
        newgolddata.gold_image = this.imgUrl ? this.imgUrl : '';
        // Add the new item to the goldDetails array ||cuckoo
        this.goldDetails1.push(newgolddata);
        this.goldDetails = new MatTableDataSource(this.goldDetails1) || new MatTableDataSource([]);
        this.showEditImage = false;
        this.showImage = false;
        this.isAllSelected()
        if (this.isAllSelected()) {
          this.selection.select(...this.goldDetails.data);
        }

        // Reset the form
        this.goldLoanForm.reset();
        this.form['nature'].setValue('');
        this.calculateTotalGoldWt();
        this.onReqAmt();
        this.imgUrl = '';  //made image null

      }

    } else if (this.goldLoanForm.invalid) {
      this.goldLoanForm.markAllAsTouched()
    }
  }

  //On deleting a table row  ||cuckoo
  onDelete(index: number) {
    Swal.fire({
      text: 'Are you sure you want to delete this item ?',
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "YES",
      confirmButtonColor: "#4747a1",
      cancelButtonColor: "#d33",
      confirmButtonText: "NO",
      allowOutsideClick: false,
    }).then((result) => {
      if (!result.isConfirmed) {
        this.editingIndex = null;
        this.goldDetails1.splice(index, 1);
        this.goldDetails1.forEach((item, i) => {
          item.gold_id = i + 1;

        });

        localStorage.setItem('length', JSON.stringify(this.goldDetails1.length));
        this.goldDetails = new MatTableDataSource(this.goldDetails1) || new MatTableDataSource([]);
        this.calculateTotalGoldWt();
        this.onReqAmt();
      }
    });
  }

  //To edit a table row || cuckoo
  onEdit(editedItem: any, index: number) {
    this.editingIndex = index;
    this.showEditImage = true;
    this.imgUrl = editedItem.gold_image;
    this.showImage = editedItem.gold_image == '' ? false : true;
    this.rate = editedItem.gold_rate; // used for weight change calculations.
    this.goldLoanForm.setValue({
      nature: editedItem.gold_nature,
      item: editedItem.gold_item,
      no: editedItem.gold_no,
      grossWeight: editedItem.gold_grosswt,
      netWeight: editedItem.gold_netwt,
      rate: editedItem.gold_rate,
      enhRate: editedItem.gold_enhrate,
      eligibleAmt: editedItem.gold_eligamt,
      remarks: editedItem.gold_remarks,

    });


  }

  //Reset the form ||Cuckoo
  onReset() {
    this.editingIndex = null;
    this.goldLoanForm.reset();
    this.form['nature'].setValue('');
  }

  //Total value calculations || Ajay
  calculateTotalGoldWt() {

    // Reset the sum to 0
    this.totalGoldGrossWt = 0;
    this.totalNetGrossWt = 0;
    this.totalEligibleAmt = 0;
    // Loop through goldDetails and add up gold_grosswt values
    this.goldDetails1.forEach(element => {
      this.totalGoldGrossWt += Number(element.gold_grosswt)
      this.totalNetGrossWt += Number(element.gold_netwt);
      this.totalEligibleAmt += Number(element.gold_eligamt);
    });
    this.goldDetails = new MatTableDataSource(this.goldDetails1) || new MatTableDataSource([]);
    let amountsArray: any = {
      eligibleAmount: this.totalEligibleAmt,
      charges: 20.00,
      approvedAmount: this.approvedAmount,
      netAmount: this.netAmount
    }
    this._collapsibleDataService.goldDataSubject.next(amountsArray);
  }

  //On nature of gold dropdown change || Ajay
  onNatureChange(event: any) {
    this.rate = 0;
    goldNature.forEach(element => {
      element.nature_name == event.target.value ? this.rate = Number(element.rate) : null;
    });
    // this.form['rate'].setValue(this.decimalPipe.transform(this.rate, '1.2-2'));
    this.form['rate'].setValue(this.rate);
    // this.form['enhRate'].setValue(this.decimalPipe.transform(this.rate, '1.2-2'));
    this.form['enhRate'].setValue(this.rate);
    const netWeight = this.form['netWeight'].value;
    const grossWeight = this.form['grossWeight'].value;
    const amountToCalculate = netWeight && grossWeight ? netWeight * this.rate : this.eligibleAmount;
    // this.form['eligibleAmt'].setValue(this.decimalPipe.transform(amountToCalculate, '1.2-2'));
    this.form['eligibleAmt'].setValue(amountToCalculate);
  }

  //On net weight/gross weight change || Cuckoo
  onWeightChange() {
    const netWeight = Number(this.form['netWeight'].value);
    const grossWeight = Number(this.form['grossWeight'].value);
    if ((this.form['netWeight'].value != "" && this.form['netWeight'].value != null && netWeight == 0)
      || (this.form['grossWeight'].value != "" && this.form['grossWeight'].value != null && grossWeight == 0)) {
      Swal.fire({
        text: 'Net Weight/Gross Weight should not be Zero !',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: "#4747a1",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then((_result: any) => {
        (this.form['netWeight'].value != "" && this.form['netWeight'].value != null && netWeight == 0) ? this.form['netWeight'].setValue('') : this.form['grossWeight'].setValue('');
        // this.form['eligibleAmt'].setValue(this.decimalPipe.transform(this.eligibleAmount, '1.2,2'));
        this.form['eligibleAmt'].setValue(this.eligibleAmount);
        return;
      });
    }
    if (netWeight && grossWeight) {
      if (netWeight > grossWeight) {
        Swal.fire({
          text: 'Net Weight should be less than or equal to Gross Weight',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: "#4747a1",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
          allowOutsideClick: false,
        }).then((_result: any) => {
          this.form['netWeight'].setValue('');
          // this.form['eligibleAmt'].setValue(this.decimalPipe.transform(this.eligibleAmount, '1.2,2'));
          this.form['eligibleAmt'].setValue(this.eligibleAmount);

          return;
        });
      }
      else {
        const calculatedAmount = this.form['nature'].value ? netWeight * this.rate : this.eligibleAmount;
        // this.form['eligibleAmt'].setValue(this.decimalPipe.transform(calculatedAmount, '1.2-2'));
        this.form['eligibleAmt'].setValue(calculatedAmount);

      }
    }
  }

  // Function for  change the requested amount and calculating the net amount || cuckoo
  onRequestedAmount(event: any) {

    if (event.target.value > this.totalEligibleAmt) {
      Swal.fire({
        text: 'Requested amount cannot be greater than eligible amount !',
        icon: 'warning',
        confirmButtonColor: "#4747a1",
        allowOutsideClick: false,
      }).then((_result: any) => {
        this.requestedAmount.setValue("");
        this.approvedAmount = 0;
        this.calculateTotalGoldWt();
        return;
      });
    }
    else if (event.target.value <= this.charges) {
      Swal.fire({
        text: 'Requested amount cannot be less than or equal to charges  !',
        icon: 'warning',
        confirmButtonColor: "#4747a1",
        allowOutsideClick: false,
      }).then((_result: any) => {
        this.requestedAmount.setValue("");
        return;
      });

    }
    else {

      this.approvedAmount = Number(this.requestedAmount.value);
      this.netAmount = this.approvedAmount - this.charges
      this.calculateTotalGoldWt();

    }
  }

  // mat table 
  pageChanged(event: PageEvent) {
    this.pageNo.setValue('');
    this.currentPage = event.pageIndex;
  }

  sortChange(event: Sort) {
    if (this.goldDetails?.filteredData?.length) {
      if (event.direction == '') {
        this.sortable = event.active;
        this.direction = 'asc';
      } else {
        this.sortable = event.active;
        this.direction = event.direction;
      }
    }
  }

  // Whether the number of selected elements matches the total number of rows || cuckoo  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.goldDetails.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection || cuckoo
  toggleAllRows() {
    this.allSelected = true
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.goldDetails.data);
  }

  // The label for the checkbox on the passed row ||cuckoo
  checkboxLabel(row?: IGoldData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.gold_id + 1}`;
  }

  //On next button click || cuckoo
  onNext() {
    if (this.goldDetails1.length > 0) {
      this.stepperVar.next();
    }
    else {
      Swal.fire({
        text: 'Add atleast one item',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: "#4747a1",
        cancelButtonColor: "#FFFF00",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      }).then((_result: any) => { });
    }
  }

  // Function for enabling the requested amount || cuckoo
  onReqAmt() {
    if (this.goldDetails1.length > 0) {
      this.requestedAmount.enable();
    }
    else {
      this.requestedAmount.setValue('');
      this.requestedAmount.disable();
      this.approvedAmount = 0;
      this.netAmount = 0;
    }
  }

  onRemarks() {
    if (this.form['remarks'].value === "") {
      this.form['remarks'].value == 'N/A';
    }
  }

}
