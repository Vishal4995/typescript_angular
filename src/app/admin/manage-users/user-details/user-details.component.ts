import { Component, OnInit, Input } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Http} from '@angular/http';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../../shared/service/http-request.service'
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: [
    './user-details.component.css',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class UserDetailsComponent implements OnInit {
  editProfileIcon = 'icofont-edit';
  public paramId:string;
  public profileImage:string;
  public inputval: any = {
    profileImage: ''
  };
  editProfile = true;
  constructor(    private HttpService:HttpRequestService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private router:Router) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.paramId=params['id'] //log the value of id
    });

    this.HttpService.getRequest('GET','USERDETAILS',`userId=${this.paramId}`).subscribe((data:any)=>{

          console.log(data);
           this.inputval=data.responseData.params;
           console.log(this.inputval);
         
    });
  }
  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

}
