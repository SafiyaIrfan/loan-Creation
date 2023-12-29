import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanCreationRoutingModule } from './loan-creation-routing.module';
import { GoldInfoComponent } from './gold-info/gold-info.component';
import { LoanCreationComponent } from './loan-creation/loan-creation.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OtherInfoComponent } from './other-info/other-info.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrDefaults, FlatpickrModule } from 'angularx-flatpickr';
import { DirectiveModule } from 'src/app/shared/directive/directive.module';
import { DemoMaterialModule } from 'src/app/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { PreviewImageComponent } from './gold-info/preview-image/preview-image.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomTooltipComponent } from 'src/app/stand-alones/custom-tooltip/custom-tooltip.component';
import { MatButtonModule } from '@angular/material/button';
import { SearchDropdownComponent } from 'src/app/stand-alones/search-dropdown/search-dropdown.component';
import { UserLetterIconsPipe } from 'src/app/core/pipe/user-letter-icons.pipe';

@NgModule({
  declarations: [
    GoldInfoComponent,
    LoanCreationComponent,
    OtherInfoComponent,
    PaymentDetailsComponent,
    PreviewImageComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoanCreationRoutingModule,
    NgbCollapseModule,
    NgbModule,
    MaterialModule,
    FlatpickrModule,
    DirectiveModule,
    DemoMaterialModule,
    MatNativeDateModule,
    MatTooltipModule,
    MaterialModule,
    NgSelectModule,
    CustomTooltipComponent,
    MatButtonModule,
    SearchDropdownComponent,
    UserLetterIconsPipe
  ],

  providers: [
    FlatpickrDefaults,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class LoanCreationModule { }
