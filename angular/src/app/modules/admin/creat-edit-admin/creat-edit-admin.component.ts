import { Router } from '@angular/router';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountDto } from '@app/core/modal/accountDto';
import { AdminService } from '@app/core/service/admin.service';
import { IcpdpService } from '@app/core/service/icpdp.service';
import { AppComponentBase } from '@shared/app-component-base';


@Component({
  selector: 'app-creat-edit-admin',
  templateUrl: './creat-edit-admin.component.html',
  styleUrls: ['./creat-edit-admin.component.css']
})
export class CreatEditAdminComponent extends AppComponentBase  implements OnInit {
  title;
  account = {} as AccountDto;
  constructor(injector: Injector,
    public dialogRef: MatDialogRef<CreatEditAdminComponent>, private dialog: MatDialog, private router:Router,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data) {
      super(injector);
     }

  ngOnInit(): void {
    if (this.data) {
      this.account = this.data;
    }
  }
  saveAndClose() {
    if (!this.data.id) {
      this.adminService.addAccount(this.account).subscribe(
        (rs) => {
          abp.notify.success(`created new Account ${this.account.fullName}`);
          this.dialogRef.close(this.account);
        },
        (err) => {
          if(err == "401"){
            this.router.navigate(["account/login"])
          }
          else{
            abp.notify.success(`created new Account ${this.account.fullName}`);
            this.dialogRef.close(this.account);
          }
         
        }
      );
    } 
  }
}

