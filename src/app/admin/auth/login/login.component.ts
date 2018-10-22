import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import {HttpRequestService  } from '../../../shared/service/http-request.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginfrm: FormGroup;
  public formSubmit = false;
  public  data:any;
  public loading = false;
  public adminEmail:string="";
  public password:string="";
  public remember:string="";
  constructor(
      private httpService: HttpRequestService,
      private router: Router,
      private toastr: ToastrService,
      private sppiner:NgxSpinnerService,
      private cookieService: CookieService
  ) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    if(this.cookieService.get('adminEmail')){
      this.adminEmail=this.cookieService.get('adminEmail');
      this.password=this.cookieService.get('password');
      this.remember="1";
    }
    this.loginfrm = new FormGroup ({
      adminEmail: new FormControl(this.adminEmail,[
          Validators.required,
          Validators.pattern("")
      ]),
     password: new FormControl(this.password,[
          Validators.minLength(2),
          Validators.required
      ]),
      remember:new FormControl(this.remember)
   }); 
  }


  onSubmit(){
    console.log(this.loginfrm.valid);
    this.formSubmit = true;
	  if(this.loginfrm.valid){
			this.sppiner.show();
          this.httpService.getRequest('POST', 'LOGIN', this.loginfrm.value)
          .subscribe((data:any) =>{
               if(data.statusCode){
                  if(this.loginfrm.value.remember==1){
                    this.cookieService.set('adminEmail',this.loginfrm.value.adminEmail);
                    this.cookieService.set('password',this.loginfrm.value.password);
                  }else{
                    this.cookieService.delete('adminEmail');
                    this.cookieService.delete('password');
                  }
                  localStorage.setItem('access_token',data.responseData.accessToken);
                  setTimeout(()=>{    		
                  this.sppiner.hide();
                  this.router.navigate(['/dashboard']);
                  }, 2000);
                }else{
				        	this.sppiner.hide();
                  this.toastr.error('Invalid Username/Email or Password!', 'Please try again');
               }
          },(error)=>{
            console.log(error);
            this.sppiner.hide();
            this.toastr.error('Network Error', 'Please try again');
            
          }
        );
       }else{
          console.log("Form invalid");

        }

  }
}
