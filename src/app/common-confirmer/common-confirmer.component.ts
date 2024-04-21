import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
export interface DialogData {
  alertText: string;
}

@Component({
  selector: 'app-common-confirmer',
  templateUrl: './common-confirmer.component.html',
  styleUrls: ['./common-confirmer.component.css']
})
export class CommonConfirmerComponent implements OnInit {
textConfirm
alertText
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any ,
    private dialogRef:MatDialogRef<CommonConfirmerComponent>
    ) {
      this.textConfirm = data.alertText
      this.alertText = data.alertText
    }

  ngOnInit() {
  }
  confirmYes(){
    this.dialogRef.close({answer:'yes'})
  }
  confirmCancel(){
    this.dialogRef.close({answer:'cancel'})
  }
}
