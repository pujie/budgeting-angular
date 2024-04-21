import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData{
  submissionId:number;
  reasonLabel:string;
  reason:string;
}
@Component({
  selector: 'app-reject-description-dialog',
  templateUrl: './reject-description-dialog.component.html',
  styleUrls: ['./reject-description-dialog.component.css']
})
export class RejectDescriptionDialogComponent implements OnInit {
  rejectReason = ''
  reasonLabel = ''
  reason:any
  constructor(
    private dialogRef:MatDialogRef<RejectDescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData
  ) {
    console.log("Data sent",data)
    this.reasonLabel = data.reasonLabel
    this.rejectReason = data.reason
  }

  ngOnInit() {
  }
  saveReject(){
    console.log("Reason_label",this.reasonLabel)
    if(this.reasonLabel==="verified"){
      this.dialogRef.close({canceled:false,reason:this.rejectReason,status:9})
    }else if(this.reasonLabel==="rejected"){
      this.dialogRef.close({canceled:false,reason:this.rejectReason,status:3})
    }

  }
  cancelReject(){
    //this.dialogRef.close({canceled:true,reason:this.rejectReason})
    this.dialogRef.close({})
  }
  closeDialog(){
    this.dialogRef.close({canceled:true,reason:this.rejectReason})
  }
}
