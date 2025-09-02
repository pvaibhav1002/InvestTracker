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
import { AuthGuard } from './guards/auth.guard';
import { UserWatchlistComponent } from './components/user-watchlist/user-watchlist.component';
import { UserPortfolioComponent } from './components/user-portfolio/user-portfolio.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'home',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'add-investment',component:AdminAddInvestmentComponent,canActivate: [AuthGuard], data: { role: 'Admin' } },
  {path:'admin-console',component:AdminConsoleComponent,canActivate: [AuthGuard], data: { role: 'Admin' } },
  {path:'edit-investment/:id',component:AdminEditInvestmentComponent,canActivate: [AuthGuard], data: { role: 'Admin' } },
  {path:'admin-feedback',component:AdminViewFeedbackComponent,canActivate: [AuthGuard], data: { role: 'Admin' } },
  {path:'admin-inquiry',component:AdminViewInquiryComponent,canActivate: [AuthGuard], data: { role: 'Admin' } },
  {path:'admin-view-investment',component:AdminViewInvestmentComponent,canActivate: [AuthGuard], data: { role: 'Admin' } },
  {path:'user-add-feedback',component:UserAddFeedbackComponent,canActivate: [AuthGuard], data: { role: 'User' } },
  {path:'user-add-inquiry/:id',component:UserAddInquiryComponent,canActivate: [AuthGuard], data: { role: 'User' } },
  {path:'user-view-feedback',component:UserViewFeedbackComponent,canActivate: [AuthGuard], data: { role: 'User' } },
  {path:'user-view-inquiry',component:UserViewInquiryComponent,canActivate: [AuthGuard], data: { role: 'User' } },
  {path:'user-view-investment',component:UserViewInvestmentComponent,canActivate: [AuthGuard], data: { role: 'User' } },
  {path:'user-view-watchlist',component:UserWatchlistComponent,canActivate: [AuthGuard], data: { role: 'User' } },
  {path:'user-view-portfolio',component:UserPortfolioComponent,canActivate: [AuthGuard], data: { role: 'User' } },
  {path:'error',component:ErrorComponent},
  {path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
