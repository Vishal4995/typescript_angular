import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpRequestService  } from '../../../shared/service/http-request.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  private sub: any;
  public id:string;
 public forgotPasswordToken: string;
changeForgotPassData: any = {};
public submitted = false;
loading = false;

constructor(
  private router: Router,
  private route: ActivatedRoute,
  private HttpService: HttpRequestService,
  public toastr: ToastrService){
}

ngOnInit(){
  document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  this.route.queryParams.subscribe(params => {
    this.id=params['id'] //log the value of id
});
}
changeForgotPassword(){
  if(!this.changeForgotPassData.newPassword || !this.changeForgotPassData.confirm || (this.changeForgotPassData.newPassword !== this.changeForgotPassData.confirm)){
    this.submitted = true;
  }
  else{
    var {newPassword} = this.changeForgotPassData;
    var forgotPasswordToken = this.id
    this.HttpService.getRequest('POST','RESET_PASSWORD',{newPassword:newPassword,forgotPasswordToken:forgotPasswordToken})
    .subscribe((response:any) => {
      // console.log(JSON.stringify(response));
      if(response.statusCode == 1){
        this.loading = true;
        this.toastr.success(response.responseData.responseMessage, response.responseData.message);
        this.router.navigateByUrl('/login');
      }
      else{
        if(response.error.errors)
          this.toastr.error(response.error.errors.message, response.error.responseMessage);
        else
          this.toastr.error(response.error.responseMessage,response.error.responseMessage);
      }
    }, error => {
      this.toastr.error('Network Error!', 'Error!');
    });
  }
}

}

