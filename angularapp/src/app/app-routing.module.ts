import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminConsoleComponent } from './components/admin-console/admin-console.component';
import { AdminViewInquiryComponent } from './components/admin-view-inquiry/admin-view-inquiry.component';
import { AdminViewInvestmentComponent } from './components/admin-view-investment/admin-view-investment.component';
import { UserAddFeedbackComponent } from './components/user-add-feedback/user-add-feedback.component';
import { UserAddInquiryComponent } from './components/user-add-inquiry/user-add-inquiry.component';
import { UserViewInquiryComponent } from './components/user-view-inquiry/user-view-inquiry.component';
import { UserViewInvestmentComponent } from './components/user-view-investment/user-view-investment.component';
import { AdminAddInvestmentComponent } from './components/admin-add-investment/admin-add-investment.component';
import { AdminEditInvestmentComponent } from './components/admin-edit-investment/admin-edit-investment.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'add-investment',component:AdminAddInvestmentComponent},
  {path:'admin-console',component:AdminConsoleComponent},
  {path:'edit-investment/:id',component:AdminEditInvestmentComponent},
  {path:'admin-feedback',component:AdminViewFeedbackComponent},
  {path:'admin-inquiry',component:AdminViewInquiryComponent},
  {path:'admin-view-investment',component:AdminViewInvestmentComponent},
  {path:'user-add-feedback',component:UserAddFeedbackComponent},
  {path:'user-add-inquiry/:id',component:UserAddInquiryComponent},
  {path:'user-view-feedback',component:UserViewFeedbackComponent},
  {path:'user-view-inquiry',component:UserViewInquiryComponent},
  {path:'user-view-investment',component:UserViewInvestmentComponent},
  {path:'error',component:ErrorComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
