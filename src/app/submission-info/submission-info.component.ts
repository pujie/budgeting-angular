import { Component, OnInit,Inject } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-submission-info',
  templateUrl: './submission-info.component.html',
  styleUrls: ['./submission-info.component.css']
})
export class SubmissionInfoComponent implements OnInit {
submissionId:any
obj={}
ucansee
logindata:any
  constructor(
    private submissionService:SubmissionService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private auth: AuthService
  ) {
    this.ucansee = false
    this.auth.isLogin((result:any) => {
      this.logindata = result
      console.log("Login Data",this.logindata)
      switch(this.logindata.role){
        case "purchase":
          this.ucansee = true
        break
        case "approval1":
          this.ucansee = true
        break
        case "approval2":
          this.ucansee = true
        break
        case "approval3":
          this.ucansee = true
        break
        case "approval4":
          this.ucansee = true
        break
        default:
          this.ucansee = false
        break
      }
    })
    console.log('this submissionId',this.data.submissionId)
    this.submissionService.getSubmissionDetailBySubmissionId(this.data.submissionId,(objs:any)=>{
      console.log("items",objs)
      this.obj = objs[0]
    })
  }

  ngOnInit() {
  }

}
