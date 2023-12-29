import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LayoutsModule} from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// Auth
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';

// Language
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SettingsModule } from './pages/modules/settings/settings.module';
import { SearchCustomerListComponent } from './stand-alones/search-customer-list/search-customer-list.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { LoanCreationModule } from './pages/modules/loan-creation/loan-creation.module';
import { MaterialModule } from './shared/Module/material/material.module';
import { DecimalPipe } from '@angular/common';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    PagesRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    PagesModule,
    SettingsModule,
    SearchCustomerListComponent,
    NgbCollapseModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SettingsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar:true
    }),
    LoanCreationModule,
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
