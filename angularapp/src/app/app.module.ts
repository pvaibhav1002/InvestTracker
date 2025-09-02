import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAddInvestmentComponent } from './components/admin-add-investment/admin-add-investment.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';
import { AdminEditInvestmentComponent } from './components/admin-edit-investment/admin-edit-investment.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { AdminViewInquiryComponent } from './components/admin-view-inquiry/admin-view-inquiry.component';
import { AdminViewInvestmentComponent } from './components/admin-view-investment/admin-view-investment.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { ErrorComponent } from './components/error/error.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { UserAddInquiryComponent } from './components/user-add-inquiry/user-add-inquiry.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { UserViewInquiryComponent } from './components/user-view-inquiry/user-view-inquiry.component';
import { UserViewInvestmentComponent } from './components/user-view-investment/user-view-investment.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { UserWatchlistComponent } from './components/user-watchlist/user-watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminAddInvestmentComponent,
    AdminConsoleComponent,
    AdminEditInvestmentComponent,
    AdminViewFeedbackComponent,
    AdminViewInquiryComponent,
    AdminViewInvestmentComponent,
    AdminnavComponent,
    ErrorComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    UserAddFeedbackComponent,
    UserAddInquiryComponent,
    UserViewFeedbackComponent,
    UserViewInquiryComponent,
    UserViewInvestmentComponent,
    UsernavComponent,
    UserWatchlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
