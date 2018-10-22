import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes: Routes = [
{
  path: '',
  redirectTo: 'login',
  pathMatch: 'full'
},
{
 path:'login',
 component: LoginComponent,
 // canActivate: [AuthGuard]
},
{
  path: 'forgot-password',
  component: ForgotPasswordComponent
 },
 {
  path: 'reset-password',
  component: ResetPasswordComponent
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { 
  constructor() {}
}
