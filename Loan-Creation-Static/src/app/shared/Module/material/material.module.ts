import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
// import { ImageModule } from 'primeng/image';


const mm = [
  CommonModule,
  MatTooltipModule,
  MatSelectModule,
  MatTooltipModule,
  MatDialogModule,
  MatTabsModule,
  MatInputModule,
  MatExpansionModule,
  MatStepperModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatCheckboxModule,
  MatMenuModule
  // ImageModule
]

@NgModule({
  declarations: [],
  imports: [...mm],
  exports: [...mm]
})
export class MaterialModule { }
