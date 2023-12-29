import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { productType, schemeNames } from 'src/app/pages/modules/loan-creation/Static data/static';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})

export class CalculatorComponent {

  calcAmountForm!: FormGroup;
  result: any;
  productName: any[] = [];
  schemeName: any[] = [];

  constructor(public dialogRef: MatDialogRef<CalculatorComponent>,
    private formBuilder: FormBuilder) {

    this.calcAmountForm = this.formBuilder.group({
      productType: new FormControl('', Validators.required),
      schemeType: new FormControl('', Validators.required),
      netWeight: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(){
    this.productName = productType;
  }

  //Calculate Amount based on the weight ||Ajay 
  calculateAmount(): void {
    const netWeightValue = this.calcAmountForm.get('netWeight')?.value;
    if (netWeightValue) {
      this.result = netWeightValue * 4200;
    } 
  }

  //Changes on Product selection ||Ajay
  onProductChange(event: Event) {
    this.schemeName = [];
    if (event.target instanceof HTMLSelectElement) {
      const selectedPro: any = event.target.value; // Cast event.target to HTMLSelectElement
      schemeNames.forEach(element => {
        if (element.PROD_TYPEID == Number(selectedPro)) { // Parse to number
          this.schemeName.push(element);
        }
      });
    }
    if (this.schemeName.length > 0) {
      this.calcAmountForm.controls["schemeType"].setValue(this.schemeName[0].SCHEMEID);
    } else {
      Swal.fire({
        text: 'No Scheme available for this product',
        icon: 'info',
        confirmButtonColor: "#4747a1",
      });
      this.calcAmountForm.controls["schemeType"].setValue('');
    }
  }

//Reset Form ||Ajay 
  resetForm(): void {
    this.calcAmountForm.reset();
    this.result = ''; 
  }

}
