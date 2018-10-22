import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent,AdminComponent,DashboardComponent]
})
export class AdminModule { }
