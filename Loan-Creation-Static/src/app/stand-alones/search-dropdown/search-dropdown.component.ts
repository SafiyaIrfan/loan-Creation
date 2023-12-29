import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-search-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgSelectModule],
  templateUrl: './search-dropdown.component.html',
  styleUrls: ['./search-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => SearchDropdownComponent)
  }]
})
export class SearchDropdownComponent implements OnInit, ControlValueAccessor {
  @ViewChild('ngSelectRef') ngSelectRef: any;
  @Input() items!: any;
  selectedValue: any;
  itemsArray: any;
  placeholder: any;
  isSearchable: any;
  isDropdownOpen: any;
  currentValue: any;
  constructor() {
  }

  onChange: any = () => { };//callback function that you call when the value of the custom control changes.
  onTouch: any = () => { };//callback function that you call when the custom control is touched.

  //update the value of the element// When ngModel or formControl value changes, this function gets called and the latest value is passed in as the argument to the function.
  writeValue(input: any): void {
    this.currentValue = input;
  }

  //this function can be called when there are any changes in the value of our custom form control.
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  //function that can be used to update the state of the form to touched.
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit() {
    this.itemsArray = this.items?.array;
  }

  //dropdown change
  onSelectionChange() {
    let value = this.selectedValue;
    this.onChange(value);
  }

  //Opens the ng-select dropdown when the input receives focus.
  onFocus(): void {
    this.ngSelectRef?.open();
    this.isDropdownOpen = true;
  }

  //closes the ng-select dropdown when the input loses focus.
  onBlur(): void {
    this.isDropdownOpen = false;
    this.ngSelectRef?.close();
  }

  //closes the ng-select dropdown if it is open and the user presses the "Tab" key.
  onTabKeyDown(event: any): void {
    if (this.isDropdownOpen) {
      this.ngSelectRef?.close();
      this.onBlur();
    }
  }
}
