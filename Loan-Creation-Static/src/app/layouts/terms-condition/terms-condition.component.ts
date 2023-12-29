import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent {
  constructor(public dialogRef: MatDialogRef<TermsConditionComponent>) {
  }

  closePopup(): void {
    this.dialogRef.close();
  }

}
