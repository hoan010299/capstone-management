import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseApiService {

  constructor(http: HttpClient , private router: Router) {
    super(http);
  }

  changeUrl() {
    return 'api/admin';
  }
  addAccount(account): Observable<any> {
    return this.http.post(this.rootUrl + `/addAccount`, account, this.httpOptions)

  }
  deleteAccount(id): Observable<any> {
    return this.http.delete(this.rootUrl + `/deleteAccount/${id}`, this.httpOptions)

  }
  public handleError(error: any) {
    if (error.status == 401) {
      return throwError("401");

    }
    return throwError(error);

  }
  
}
