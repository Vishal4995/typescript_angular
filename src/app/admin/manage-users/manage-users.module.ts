import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersComponent } from './manage-users.component';
import { UserListComponent } from './user-list/user-list.component';
import {AdminModule} from '../admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {SharedModule} from '../../shared/shared.module'
import {NgxPaginationModule} from 'ngx-pagination';
import { UserDetailsComponent } from './user-details/user-details.component'


@NgModule({
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    AdminModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  declarations: [ManageUsersComponent, UserListComponent, UserDetailsComponent]
})
export class ManageUsersModule {
  constructor(){
    
  }
 }
