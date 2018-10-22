import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: "./admin/auth/auth.module#AuthModule",
  },
  {
    path: "dashboard",
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: "manageusers",
    loadChildren: './admin/manage-users/manage-users.module#ManageUsersModule',
 },

 
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { 
constructor(){
};


}
