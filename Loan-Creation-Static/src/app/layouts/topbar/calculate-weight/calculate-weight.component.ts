import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CalculatorComponent } from '../calculator/calculator.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { productType, schemeNames } from 'src/app/pages/modules/loan-creation/Static data/static';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calculate-weight',
  templateUrl: './calculate-weight.component.html',
  styleUrls: ['./calculate-weight.component.scss']
})

export class CalculateWeightComponent {
  calcWeightForm!: FormGroup;
  resultWeight: any;
  productName: any[] = [];
  schemeName: any[] = [];

  constructor(public dialogRef: MatDialogRef<CalculatorComponent>,
    private formBuilder: FormBuilder) {

    this.calcWeightForm = this.formBuilder.group({
      productType: new FormControl('', Validators.required),
      schemeType: new FormControl('', Validators.required),
      netAmount: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.productName = productType;
  }
  //Function to calculate weight ||Ajay
  calculateWeight(): void {
    const netWeightValue = this.calcWeightForm.get('netAmount')?.value;
    if (netWeightValue) {
      this.resultWeight = netWeightValue / 4200;
    }
  }

  //onchange of product ||Ajay
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
      this.calcWeightForm.controls["schemeType"].setValue(this.schemeName[0].SCHEMEID);
    } else {
      Swal.fire({
        text: 'No Scheme available for this product',
        icon: 'info',
        confirmButtonColor: "#4747a1",
      });
      this.calcWeightForm.controls["schemeType"].setValue('');
    }
  }

  //Reset form ||Ajay
  resetForm(): void {
    this.calcWeightForm.reset();
    this.resultWeight = '';
  }



}
