import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';
// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { MaterialModule } from '../shared/Module/material/material.module';
import { DirectiveModule } from '../shared/directive/directive.module';
import { MatButtonModule } from '@angular/material/button';
import { DatatableComponent } from '../stand-alones/datatable/datatable.component';
import { UserLetterIconsPipe } from '../core/pipe/user-letter-icons.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    LightboxModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DirectiveModule,
    NgbCollapseModule,
    MatButtonModule,
    DatatableComponent,
    UserLetterIconsPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CustomerSearchComponent,

  ]
})
export class PagesModule {
  constructor() {
  }
}
