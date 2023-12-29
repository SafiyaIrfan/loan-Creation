import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LanguageService } from '../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
// Component pages
import { LayoutComponent } from './layout.component';
import { VerticalComponent } from './vertical/vertical.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { HorizontalTopbarComponent } from './horizontal-topbar/horizontal-topbar.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { CalculatorComponent } from './topbar/calculator/calculator.component';
import { MaterialModule } from '../shared/Module/material/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CalculateWeightComponent } from './topbar/calculate-weight/calculate-weight.component';
import { TabContainerComponent } from './topbar/tab-container/tab-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../shared/directive/directive.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbDropdownModule,
        NgbNavModule,
        SimplebarAngularModule,
        TranslateModule,
        LayoutComponent,
        VerticalComponent,
        SidebarComponent,
        FooterComponent,
        RightsidebarComponent,
        HorizontalComponent,
        HorizontalTopbarComponent,
        MaterialModule,
        MaterialModule,
        MatDialogModule, 
        ReactiveFormsModule,
        FormsModule,
        DirectiveModule,
    ],
    providers: [LanguageService],
    declarations: [
      CalculatorComponent,
      TermsConditionComponent,
      PrivacyPolicyComponent,
      CalculateWeightComponent,
      TabContainerComponent,     
    ],
    exports:[
      TermsConditionComponent,
      PrivacyPolicyComponent
    ]
})
export class LayoutsModule { }
