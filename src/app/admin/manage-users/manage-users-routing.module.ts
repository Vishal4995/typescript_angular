import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';
import { UserListComponent } from './user-list/user-list.component';
import { HeaderComponent } from '../header/header.component';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { UserDetailsComponent } from './user-details/user-details.component'

const routes: Routes = [
  {
   path:'',
   component: HeaderComponent,
   children: [
    {
       path: '',
       component:UserListComponent,
       canActivate: [AuthGuard]
     },
     {
      path: 'userDetails/:id',
      component:UserDetailsComponent,
      canActivate: [AuthGuard]
     }
   ]
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
