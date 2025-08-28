import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { AdminViewFeedbackComponent } from './components/admin-view-feedback/admin-view-feedback.component';
import { UserViewFeedbackComponent } from './components/user-view-feedback/user-view-feedback.component';

const routes: Routes = [
  {path:'error',component:ErrorComponent},
  {path:'admin-view-feedback',component:AdminViewFeedbackComponent},
  {path:'user-view-feedback',component:UserViewFeedbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
