import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LayoutsModule } from 'src/app/layouts/layouts.module';
import { NgbCarouselModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from '../../pages-routing.module';
import { ImagePopupComponent } from './image-popup/image-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { TermsConditionComponent } from 'src/app/layouts/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from 'src/app/layouts/privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    LoginComponent,
    ImagePopupComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SimplebarAngularModule,
    LayoutsModule,
    NgbDropdownModule,
    NgbNavModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgbCarouselModule,
    PagesRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FooterComponent,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
  ]
})
export class AccountModule { }
