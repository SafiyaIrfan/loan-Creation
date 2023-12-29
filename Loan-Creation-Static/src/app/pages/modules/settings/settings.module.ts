import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { ThemeCustomizerComponent } from './theme-customizer/theme-customizer.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LanguageService } from 'src/app/core/services/language.service';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { NgbCarouselModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PagesRoutingModule } from '../../pages-routing.module';
import { LightboxModule } from 'ngx-lightbox';
import { SidebarComponent } from 'src/app/layouts/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListingComponent } from './customer-listing/customer-listing.component';
import { LayoutComponent } from 'src/app/layouts/layout.component';
import { SearchCustomerListComponent } from 'src/app/stand-alones/search-customer-list/search-customer-list.component';
import { MaterialModule } from 'src/app/shared/Module/material/material.module';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    ThemeCustomizerComponent,
    CustomerListingComponent,

  ],
  imports: [
    SimplebarAngularModule,
    CommonModule,
    SettingsRoutingModule,
    LayoutsModule,
    NgbDropdownModule,
    NgbNavModule,
    TranslateModule,
    PagesRoutingModule,
    LightboxModule,
    SidebarComponent,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutComponent,
    SearchCustomerListComponent,
    MaterialModule,
    MatMenuModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [LanguageService]
})
export class SettingsModule { }
