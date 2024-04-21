import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-approval-dialog',
  templateUrl: './approval-dialog.component.html',
  styleUrls: ['./approval-dialog.component.css']
})
export class ApprovalDialogComponent implements OnInit {
obj = {
  id:0,
  canApprove:false,
  approvalStatus:1,
  action:'',reason:'',dialog_type:2
}
reject = false
  constructor(
    private dialogRef:MatDialogRef<ApprovalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    console.log('Data received',data)
    this.obj = data
    if(this.obj.dialog_type == 2){
      this.obj.approvalStatus = 1
    }else{
      this.obj.approvalStatus = 2
    }
  }

  ngOnInit() {
  }
  onNoClick(){
    this.dialogRef.close()
  }
  onYesClick(){
    this.reject = true
  }
  onSave(obj){
    this.dialogRef.close(obj)
  }
}
