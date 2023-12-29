import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLetterIconsPipe } from 'src/app/core/pipe/user-letter-icons.pipe';
import { LocalStorageService } from 'src/app/core/services/loan-data.service';


@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [CommonModule,DataTablesModule,MaterialModule,RouterModule,UserLetterIconsPipe],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {

  showSearch = true;
  showInfo: boolean = true;
  showOrdering: boolean = true;
  showPaging: boolean = true;
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<ADTSettings>();
  @Input() heading: any;
  @Input() dtOptions: any;
  @Input() content: any;
  // @Input() header: any
  @Output() maskedMobileNumber = new EventEmitter<any>();
  @Output() userChangeEvent = new EventEmitter<any>();
  @Output() hidedListDiv = new EventEmitter<any>();
  @Output() shoowListDiv = new EventEmitter<any>();
  @Output() saveCustDetails = new EventEmitter<any>();
  _object = Object;
  hoveredRowIndex: number | null = null;
  // @Input() message: any

  constructor(public dialogRef: MatDialogRef<any>,private localStorageService: LocalStorageService,) { }

  ngOnInit(): void {
    console.log("value", this.content)

  }

  maskMobileNumber(mobno: any) {
    this.maskedMobileNumber.emit(mobno);
    
  }

  showListDiv(index:any) {
    this.shoowListDiv.emit(index);
    this.hoveredRowIndex = index
  }

  hideListDiv() {
    this.hidedListDiv.emit();
    this.hoveredRowIndex = null;
  }

  saveCustomerDetails(customer:any){
    this.localStorageService.setCustomer(customer);
    this.saveCustDetails.emit(customer)
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // For searching the person details
  onSearch() {
    this.showSearch = !this.showSearch;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtOptions.searching = this.showSearch;
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  // For showing the information
  onInfo() {
    this.showInfo = !this.showInfo;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtOptions.info = this.showInfo;
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  // For sorting the table
  onOrder() {
    this.showOrdering = !this.showOrdering;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtOptions.ordering = this.showOrdering;
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
  isValueAnArray(value: any): boolean {
    return Array.isArray(value);
  }
  // For pagination
  onPaging() {
    this.showPaging = !this.showPaging;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      this.dtOptions.paging = this.showPaging;
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
}
