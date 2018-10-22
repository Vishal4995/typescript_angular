import {environment} from '../../../environments/environment';
import { HttpHeaders,HttpClientModule,HttpClient,HttpParams  } from '@angular/common/http';
import { BaseRequestOptions } from '@angular/http';
console.log(environment);
export const BASE_URL=environment.END_POINT;

//export const BASE_POINT=environment.BASE_POINT;

export const HTTP_HEADER_OPTION_FN = function(){
  return {
  headers: new HttpHeaders({ 'Content-Type':  'application/json', 
  'Authorization':'Basic YWRtaW46UTFXMkUzUjRUNQ==',
  'accessToken': localStorage.getItem('access_token')?localStorage.getItem('access_token'):'' })
  }
}

export const HTTP_HEADER_OPTION_WI_TOKEN = {
  headers: new HttpHeaders({ 'Content-Type':  'application/json', 
  'platform':"3",
  'Authorization':'Basic YWRtaW46UTFXMkUzUjRUNQ==',
  'accessToken':""
   })
};

export const APIURLS ={

      
      LOGIN:BASE_URL+"admin/login",

      FORGOT_PASSWORD:BASE_URL+"admin/forgetPassword",

      ADMININFO:BASE_URL+"admin",

      VERIFY_TOKEN:BASE_URL+"admin/verify-token",

      RESET_PASSWORD:BASE_URL+"admin/resetPassword",

      CATEGORY:BASE_URL+"category",

      TERMS:BASE_URL+"help-center",

      PRIVACY:BASE_URL+"help-center",

      BUSINESS:BASE_URL+"business/list/",

      ADD_EMPLOYEE:BASE_URL+"user/add-employee",

      USERLIST:BASE_URL+"user/userList",

      USERDETAILS:BASE_URL+"user/userDetail",

      EDIT_EMPLOYEE_BY_ID:BASE_URL+"user/edit-employee",

      DEL_EMPLOYEE_BY_ID:BASE_URL+"user/delete-employee",

      ACTIVE_EMPLOYEE:BASE_URL+"user/employee-action",

      EXPORT_EMPLOYEE:BASE_URL+"user/export-employee",

      CARD_TEMPLATE:BASE_URL+'card-template',

      CARD_TEMPLATE_DETAILS:BASE_URL+'card-template/details',

      ADD_BUSINESS :BASE_URL+'business',

      BUSINESS_LIST:BASE_URL+'business/list',

      BUSINESS_ACTION:BASE_URL+'business/action',

      BUSINESS_BLOCK:BASE_URL+'business/block',

      BUSINESS_DETAILS:BASE_URL+'business/details/',

      PRIVATE_ACCOUNT_LIST:BASE_URL+'user/account-list/',

      DELETE_USER:BASE_URL+'user/deleteUser',

      PRIVATE_ACCOUNT_ACTION:BASE_URL+'user/account-action/',

      PRIVATE_ACCOUNT_DETAILS:BASE_URL+'user/account-details/',

      EDIT_PRIVATE_ACCOUNT:BASE_URL+'user/edit-account/',

      ADMIN_DASHBOARD:BASE_URL+'admin/dashboard/',

      EXPORT_PRIVATE_ACCOUNT:BASE_URL+'user/export-account',

      IMPORT_EMPLOYEE:BASE_URL+'user/import-employee',

      NOTIFY_EMPLOYE:BASE_URL+'user/notify-employee',

      UPLOAD_FONTS:BASE_URL+'font',

      GET_FONTS:BASE_URL+'font',

      ADMIN_LOGOUT:BASE_URL+'admin/logout',

      CARD_DETAILS: BASE_URL+'card/details',
}

