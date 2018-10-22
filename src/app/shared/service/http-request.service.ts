import { Injectable } from '@angular/core';
import { APIURLS , HTTP_HEADER_OPTION_FN} from './../../shared/apiurl/apiurl';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router'

@Injectable()
export class HttpRequestService {
  constructor(private http: HttpClient, private toaster: ToastrService, private myRoute: Router) {}

  getApi(apiName: string) {
    const Url = APIURLS[apiName];
    return Url;
  }

  getRequest(type: string, requestUrl: string, data?: any): Observable<any> {
    if (type === 'GET') {
      return this.http.get<any>(this.getApi(requestUrl) + '?' + data,HTTP_HEADER_OPTION_FN());
    } else if (type === 'POST') {
      return this.http.post<any>(this.getApi(requestUrl), data,HTTP_HEADER_OPTION_FN());
    }
  }
  isLoggednIn() {
    return localStorage.getItem("access_token")
  }
 

  showError(errormsg: string) {
    this.toaster.error(errormsg);
  }

  
}
