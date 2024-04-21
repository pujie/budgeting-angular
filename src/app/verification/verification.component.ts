import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../role.service';
import { MailService } from '../mail.service';
import { MailTemplateService } from '../mail-template.service';
import { MatDialog } from '@angular/material/dialog';
import { RejectDescriptionDialogComponent } from '../reject-description-dialog/reject-description-dialog.component';
import { CommonService } from '../common.service';
import { ImageService } from '../image.service';
import { ActivitylogService } from '../activitylog.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
submissionId
logindata:any
newAttribute:any
obj = {subject:'',itemname:'',staff_name:'',budgeting_number:'',creatoremail:'',reject_reason:'',verificationreason:''}
  constructor(
    private submission:SubmissionService,
    private activatedRoute:ActivatedRoute,
    private roleService: RoleService,
    private mailService: MailService,
    private mailTemplateService: MailTemplateService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private imageService: ImageService,
    private activityLogService: ActivitylogService
    ) {
    this.submissionId = +this.activatedRoute.snapshot.paramMap.get('submissionId')!;
    this.submission.getSubmissionById(this.submissionId,(obj:any)=>{
      console.log("Obj",obj)
      this.obj = obj[0]
      this.commonService.convertoblob(obj[0].scanpo.data,(blob:any)=>{
        this.imageService.createImageFromBlob(blob,(image:any)=>{
          console.log('Image',image)
          console.log('clickToUpload',this.commonService.clickToUpload())
          if(this.commonService.clickToUpload()===image){
            document.getElementById('scanPOImage')!.setAttribute('src',this.commonService.imageNotUploadedYet())
          }else{
          document.getElementById('scanPOImage')!.setAttribute('src',image)}
        })
      })
    })
  }
  ngOnInit() {
  }
  getStatusText(status:any,callback:any){
    callback((status==3)?{status:'rejected',description:this.obj.reject_reason}:{status:'verified',description:this.obj.verificationreason})
  }
  showRejectDescriptionDialog(status:any){
    console.log("Status param",status)
    this.getStatusText(status,(statusText:any)=>{
      const dialogRef = this.dialog.open(RejectDescriptionDialogComponent,{
        width:'250px',
        data:{
          submissionId:this.submissionId,
          reasonLabel:statusText.status,
          reason:statusText.description,
        }
      })
      dialogRef.afterClosed().subscribe(dialogparam=>{
        console.log("rejectReason",dialogparam)
        if(!dialogparam.canceled){
          console.log("rejectReasonResult",dialogparam.reason)
          console.log("Verify submission invoked")
          this.submission.setSubmissionDetailStatusBySubmissionId({
            //id:this.submissionId,status:status
            id:this.submissionId,status:dialogparam.status
          },(submission:any)=>{
            if(dialogparam.status===9){
              this.submission.updateVerificationReasonBySubmissionid({
                verificationreason:dialogparam.reason,
                submissionId:this.submissionId
              },(res:any)=>{
                this.roleService.getRoleMails({identifier:'purchase'},(role:any)=>{
                  this.commonService.extractMail(role,(mailArray:any)=>{
                    console.log('mailAray',mailArray)
                  this.mailService.postMail({
                    recipient:mailArray,
                    cc:this.obj.creatoremail,
                    msg:this.mailTemplateService.submissionRejectedNotification(
                      {
                        creator:localStorage.getItem('username'),
                        itemName:this.obj.itemname,
                        budgetingNumber:this.obj.budgeting_number,
                        submissionId:this.submissionId,
                        reason:dialogparam.reason,
                        status:statusText.status
                      }),
                    subject:'Your Purchase Submission ('+this.obj.itemname+', '+this.obj.staff_name+') Budgeting number:'+this.obj.budgeting_number+' is '+statusText.status
                  },
                  (mail:any)=>{
                    this.activityLogService.create({
                      email:localStorage.getItem('email'),
                      module:'verification',
                      description:'verify ('+this.commonService.sanitizeString(this.obj.itemname)+'), submissionId: '+this.submissionId
                      },(log:any)=>{
                        window.location.href = "/landing"
                      })
                  })
  
                  });
                })
              })
  
            }else if(dialogparam.status===3){
              console.log('Reject Invoked',dialogparam);
              this.submission.updateRejectReasonBySubmissionId({
                reject_reason:dialogparam.reason,
                submissionId:this.submissionId
              },(res:any)=>{
                this.roleService.getRoleMails({identifier:'purchase'},(role:any)=>{
                  this.commonService.extractMail(role,(mailArray:any)=>{
                    console.log('mailAray',mailArray)
                  this.mailService.postMail({
                    recipient:mailArray,
                    cc:this.obj.creatoremail,
                    msg:this.mailTemplateService.submissionRejectedNotification(
                      {
                        creator:localStorage.getItem('username'),
                        itemName:this.obj.itemname,
                        budgetingNumber:this.obj.budgeting_number,
                        submissionId:this.submissionId,
                        reason:dialogparam.reason,
                        status:statusText.status
                      }),
                    subject:'Your Purchase Submission ('+this.obj.itemname+', '+this.obj.staff_name+') Budgeting number:'+this.obj.budgeting_number+' is '+statusText.status
                  },
                  (mail:any)=>{
                    this.activityLogService.create({
                      email:localStorage.getItem('email'),
                      module:'verification',
                      description:'verify ('+this.commonService.sanitizeString(this.obj.itemname)+'), submissionId: '+this.submissionId
                      },(log:any)=>{
                        window.location.href = "/landing"
                      })
                  })
  
                  });
                })
              })
  
            }
          })
        }
      })
    })
  }
}
