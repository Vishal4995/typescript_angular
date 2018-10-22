import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import {HttpRequestService  } from '../service/http-request.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private HttpService: HttpRequestService,
    private myRoute: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.HttpService.isLoggednIn()){
       // this.myRoute.navigate(["/dashboard"]);
        return true;
      }else{
        console.log("login")
        this.myRoute.navigate(["/login"]);
        return false;
      }  
  }
}
