import { RequestLogDetailComponent } from './request-log-detail/request-log-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { RequestDto } from "./../../core/modal/requestLogDto";
import { RequestLogService } from "./../../core/service/requestLog.service";
@Component({
  selector: 'app-request-log',
  templateUrl: './request-log.component.html',
  styleUrls: ['./request-log.component.css']
})
export class RequestLogComponent implements OnInit {
  requestLogList: RequestDto[] = [];
  p: number = 1;
  filterRequestType: any = ""
  searchText: string = ""
  constructor(private requestLogService: RequestLogService, private router: Router, private dialog: MatDialog
  ) { }
  tempRequestLogList: RequestDto[] = [];
  ngOnInit(): void {
    this.getAllRequestLog()
  }
  getAllRequestLog() {
    this.requestLogService.getAllListRqLog().subscribe((data) => {
      this.requestLogList = data;
      this.tempRequestLogList = data;
    },
      (err) => {
        if (err == "401") {
          this.router.navigate(["account/login"])
        }
      })
  }
  viewDetail(request) {
    this.dialog.open(RequestLogDetailComponent, {
      width: "800px",
      data: {
        id: request.id
      }
    })
  }
  onChange() {
    if (this.filterRequestType == '') {
      this.requestLogList = this.tempRequestLogList.filter(item=>item.account.email.toLowerCase().includes(this.searchText.toLowerCase()))
    }
    else {
      this.requestLogList = this.tempRequestLogList.filter(item => item.request.typeRequest == this.filterRequestType
         &&( item.account.email.toLowerCase().includes(this.searchText.toLowerCase())))

    }
    this.p = 1
  }

}
