import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerService, Rgba } from 'ngx-color-picker';
import { FormGroup, FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpRequestService } from '../../../shared/service/http-request.service'
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';


const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;



const now = new Date();

export class Cmyk {
  constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  p: number = 1;
  limit: number = 5;
  filterform: FormGroup;
  public loader: boolean = false;
  switchDisable = true;
  public userlist: any;
  public model: any;
  modelCustomDay: any;
  public searchvalue;
  displayMonths = 3;
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate: NgbDateStruct;
  fromDate: string;
  toDate: string;
  disabled = true;
  toggle = false;
  public filterstatus: string;
  public show: any = false;
  public finaldata = [];
  modelPopup: NgbDateStruct;
  modelPopup1: NgbDateStruct;
  public chekvalue: string;
  public checked = [];
  public date: { year: number, month: number };
  public token: string;
  public datePipe;
  public status;
  public totalrecord;
  public paramId;
  public list;
  public str;
  fileToUpload: File = null;
  public selectedAll: boolean = false;
  public selected = [];
  public notifybutton: boolean = true;
  public notifyid = [];
  public recordOnpage;



  constructor(
    public parserFormatter: NgbDateParserFormatter,
    public calendar: NgbCalendar,
    public toast: ToastrService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    private HttpService: HttpRequestService
  ) {
    this.datePipe = new DatePipe('en-US');
    console.log("with in costrutor");
  }


  enable: boolean = true;

  ngOnInit() {
    this.filterform = new FormGroup({
      searchvalue: new FormControl(""),
    });
    this.getPage(1, '', '');
    this.getemployeelist(this.p, this.limit, '');
  }

  getemployeelist(pageNo, count, search) {
    this.HttpService.getRequest('GET', 'USERLIST', `pageNo=${pageNo}&count=${count}&search=${search}`).subscribe((data: any) => {
      console.log(data);
      this.userlist = data.responseData.response;
      this.totalrecord = data.responseData.total;
      this.list = data.responseData.message
      this.recordOnpage = data.responseData.response.length
      for (var i = 0; i < data.responseData.response.length; i++) {
        this.selected[data.responseData.response[i]._id] = false;
        if (data.responseData.response[i].isActive == true) {
          this.checked[data.responseData.response[i]._id] = true;
        } else {
          this.checked[data.responseData.response[i]._id] = false;
        }
      }
    }, error => {
      this.toast.error(error.statusText, 'Could not get User List');
    }
    )
  }
  filterData() {
    this.getemployeelist(
      this.p,
      this.limit,
      this.filterform.value.searchvalue)
  }

  pageChanged(event) {
    this.p = event;
    this.getemployeelist(this.p, this.limit, this.filterform.value.searchvalue);
  }
  resetForm() {
    this.filterform.reset();
    this.ngOnInit();
  }

  getPage(pageNo, count, searchKey) {
    this.p = pageNo;
    this.loader = true;

    this.HttpService.getRequest('GET', 'USERLIST', `pageNo=${pageNo}&count=${count}&search=${searchKey}`)
      .subscribe((data: any) => {
        if (data.statusCode == 1) {
          this.loader = false;
          var sno = ((pageNo - 1) * count) + 1;
          for (var i = 0; i < data.responseData.response.length; i++) {
            data.responseData.response[i].sno = sno++;
          }
          this.userlist = data.responseData.response;
          this.totalrecord = data.responseData.total;
          this.list = data.responseData.message
          for (var i = 0; i < data.responseData.response.length; i++) {
            if (data.responseData.response[i].isBlocked == false) {
              this.checked[data.responseData.response[i]._id] = true;
            }
          }
        }
        else {
          if (!_.isEmpty(data.error.errors)) {
            this.loader = false;

            this.toastr.error(data.error.errors.message, 'Validation Error!');
          } else {
            this.loader = false;

            this.toastr.error(data.error.responseMessage, 'Network Error!');
          }
        }
      }, error => {
        this.loader = false;

        this.toastr.error(error.statusText, 'Error!');
      });
  }
  delete(userid){
		Swal({
			title: 'Are you sure you want to delete this User?',
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
			allowOutsideClick: false
		})
		.then((result) => {
			if(result.value){
				this.HttpService.getRequest('DELETE','DELETE_USER',`userid=${userid}`).subscribe((response:any) => {
					if(response.statusCode == 1){
						Swal({
							type:'success',
							title: 'Deleted!',
							text: response.responseData.message
						})
						this.ngOnInit();
					}
					else{
						if(!_.isEmpty(response.error.errors)){
							this.loader=false;
							this.toastr.error(response.error.errors.message, 'Validation Error!');
						}else{
							this.loader=false;
							this.toastr.error(response.error.responseMessage, 'Network Error!');
						}
							
					}
				}, error => {
					this.loader=false;
					this.toastr.error('Network Error!', 'Error!');
				});
			}
			else if(result.dismiss === Swal.DismissReason.cancel){
			}
		});
	}




}
