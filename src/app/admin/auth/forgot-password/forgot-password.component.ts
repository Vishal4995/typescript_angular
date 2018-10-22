import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpRequestService  } from '../../../shared/service/http-request.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
	forgotPassData: any = {};
	public submitted = false;
	loading = false;

	constructor(private router: Router, private HttpService: HttpRequestService, public toastr: ToastrService) {
		
	}

	ngOnInit() {
		document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
	}

	forgotPassword() {
		if (!this.forgotPassData.adminEmail) {
			this.submitted = true;
		} else {
			var {adminEmail} = this.forgotPassData;
			this.HttpService.getRequest('POST','FORGOT_PASSWORD', {adminEmail:adminEmail})
			.subscribe((response:any) => {
					if(response.statusCode == 1){
					this.loading = true;
					this.toastr.success(response.responseData.responseMessage, response.responseData.message);
					this.router.navigateByUrl('/login');
				}
				else{
					if(response.error.errors)
						this.toastr.error(response.error.errors.message, response.error.responseMessage);
					else
						this.toastr.error(response.error.responseMessage, response.error.responseMessage);
				}
			}, error => {
				this.toastr.error('Network Error!', 'Error!');
			});
		}
	}
}