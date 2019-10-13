import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthWithJwtPageComponent } from './auth-with-jwt-page/auth-with-jwt-page.component';
import { GeneratorComponent } from './generator/generator.component';
import { NotAuthenticatedAlertComponent } from './not-authenticated-alert/not-authenticated-alert.component';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutWithStripeComponent } from './checkout-with-stripe/checkout-with-stripe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth-interceptor.service';
import { HomePageComponent } from './home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';

/**
 * Angular app module.
 */
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthWithJwtPageComponent,
    GeneratorComponent,
    NotAuthenticatedAlertComponent,
    CheckoutWithStripeComponent,
    HomePageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(environment.stripeKey),
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [CheckoutWithStripeComponent, NotAuthenticatedAlertComponent]
})
export class AppModule {}
