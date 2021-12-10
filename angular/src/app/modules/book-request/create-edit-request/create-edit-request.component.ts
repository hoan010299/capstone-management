import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-request',
  templateUrl: './create-edit-request.component.html',
  styleUrls: ['./create-edit-request.component.css']
})
export class CreateEditRequestComponent extends AppComponentBase implements OnInit {
  public title:string="Create booking request"
  constructor( @Inject(MAT_DIALOG_DATA) public dialogRef:MatDialogRef<CreateEditRequestComponent> ,
  injector: Injector) { super(injector) }

  ngOnInit(): void {
  }

}
