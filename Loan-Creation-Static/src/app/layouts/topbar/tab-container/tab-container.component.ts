import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.scss']
})
export class TabContainerComponent {
  constructor(public dialogRef: MatDialogRef<TabContainerComponent>){

  }
}
