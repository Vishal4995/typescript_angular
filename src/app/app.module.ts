import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MenuItems} from './shared/menu-items/menu-items';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpRequestService }  from './shared/service/http-request.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard} from './shared/guard/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AppRoutingModule,
    AdminModule,
    
  ],
  providers: [MenuItems, HttpRequestService, CookieService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
