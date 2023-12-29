import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent { 
  imageUrl: string="assets/images/banner-popup.jpg"; 
  constructor(public dialogRef: MatDialogRef<ImagePopupComponent>) {}
  
  closePopup(): void {
    this.dialogRef.close();
  }

}
