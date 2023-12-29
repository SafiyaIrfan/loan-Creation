import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss']
})
export class PreviewImageComponent {
  imgUrl: any
  showTitle: boolean


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<PreviewImageComponent>) {
    this.imgUrl = data.imageUrl
    this.showTitle = data.showTitle
  }


}
