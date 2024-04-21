import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { SubmissionService } from '../submission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CommonConfirmerComponent } from '../common-confirmer/common-confirmer.component'
import { CommonService } from '../common.service';
import { MailService } from '../mail.service';
import { ActivitylogService } from '../activitylog.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'final-price.component',
  templateUrl: './final-price.component.html',
  styleUrls: ['./final-price.component.css'],
})
export class FinalPriceComponent implements OnInit{
  priceFormControl = new FormControl('',[
    Validators.required,
  ])
  differ = 0
  differPercentage = 0
  differPercentagetext = '0 %'
  matcher = new MyErrorStateMatcher();
  submission = {
    subject:'',
    submission_date:'',
    implementatmat_target:'',
    purchase_target:'',
    staff_name:'',
    totalprice:0,
    final_price:0,
    itemname:'',creatoremail:''
  }
  morethan50percent = false
  lessthan50percent = true
  submissionId
  constructor(
    private submissionService: SubmissionService,
    private activatedRoute: ActivatedRoute,
    private commonConfirmer: MatDialog,
    private router: Router, 
    private commonService: CommonService, 
    private mailService: MailService,
    private activityLogService: ActivitylogService,
    
  ){
    this.submissionId = this.activatedRoute.snapshot.paramMap.get('submissionId')
    this.submissionService.getSubmissionById(this.submissionId,result=>{
      console.log("Result of submissionservice",result)
      this.submission = result[0]
      this.submission.final_price = this.submission.totalprice
    })
  }
  ngOnInit(){}

/*

  rejectByVerifier(submission){
    const confirmer = this.commonConfirmer.open(CommonConfirmerComponent,{
      data:{
        alertText:"Benar-benar akan membatalkan " + submission.budgeting_number + " ?"
      }
    })
    confirmer.afterClosed().subscribe(result=>{
      console.log("After Close",result)
      switch(result.answer){
        case 'yes':
          this.rejectVerified(submission,res=>{
            this.reloadData()
            console.log('res removed',res)
          })
          break
        case 'cancel':
          break
      }
    })
    console.log("Rejected by Verifier")
  }

*/


  updatePrice(){
    this.submissionService.updateFinalPriceBySubmissionId({final_price:this.submission.final_price,submissionId:this.submissionId},res=>{
      console.log("update Price res",res)
      /*const dialogRef = this.commonConfirmer.openFromComponent(CommonConfirmerComponent,{
        duration: 3600,
        verticalPosition: "top",
        data:{
          alertText:'Final Price saved',
          alertDetail:'Data sudah diperbarui'
        }
      })
      dialogRef.afterDismissed().subscribe(data=>{*/
        const confirmer = this.commonConfirmer.open(CommonConfirmerComponent,{
          data:{
            alertText:"Final Price Saved "
          }
        })
        confirmer.afterClosed().subscribe(data=>{
    
        console.log("commonconfirmer",data)
        console.log("SUBMission",this.submission)
        this.submissionService.setSubmissionDetailStatusBySubmissionId({id:this.submissionId,status:7},res=>{
          console.log("submission updated",this.submissionId,res)
          this.submissionService.updateRejectReasonBySubmissionId(
            {
              submissionId:this.submissionId, 
              reject_reason:null
            }, result => {
              console.log("Success",result)
              this.notificationMail({
                name:this.submission.subject,
                price:this.submission.final_price,
                itemname:this.submission.itemname,
                creatoremail:this.submission.creatoremail
              },()=>{
                this.activityLogService.create({
                  email:localStorage.getItem('email'),
                  module:'final-price',
                  description:'set finalprice('+this.submission.final_price+') for '+this.submission.subject+',submissionId:'+this.submissionId
                },log => {
                  this.warehouseAlert({itemname:this.submission.itemname},()=>{
                    this.router.navigate(['/landing'])
                  })
                  console.log('Log created',log)
                  
                })
              })

            })
        })
      })
    })
  }
  checkDiffer(){
    this.differ = this.submission.final_price - this.submission.totalprice
    this.differPercentage = ((this.differ/this.submission.final_price)*100)
    if(this.differPercentage>5){
      this.morethan50percent = true
    }else{
      this.morethan50percent = false
    }
    this.differPercentagetext = ((this.differ/this.submission.final_price)*100).toFixed(2) + ' %'
  }
  rejectSubmission(){
    this.submissionService.updateFinalPriceBySubmissionId({final_price:this.submission.final_price,submissionId:this.submissionId},res=>{
      console.log("update Price res",res)
      const dialogRef = this.commonConfirmer.open(CommonConfirmerComponent,{
        //duration: 3600,
        //verticalPosition: "top",
        data:{
          alertText:'Final Price saved',
          alertDetail:'Data sudah diperbarui'
        }
      })
      this.submissionService.setSubmissionDetailStatusBySubmissionId({id:this.submissionId,status:3},res => {
        this.submissionService.updateRejectReasonBySubmissionId(
          {
            submissionId:this.submissionId, 
            reject_reason:'differ more than 5 %'
          }, result => {
          console.log("Success",result)
          const dialogRef = this.commonConfirmer.open(CommonConfirmerComponent,{
            //duration: 3600,
            //verticalPosition: "top",
            data:{
              alertText:'Submission Rejected',
              alertDetail:'Differ more than 5 %'
            }
          })
          dialogRef.afterClosed().subscribe(data => {
            this.router.navigate(['/landing'])
          })
        })
      })
    })
  }
  notificationMail(obj,callback){
    console.log("OBJ Got",obj)
    let msg = 'Hi  the final price for '+ obj.itemname +' has been set <br /> '
    msg+= '<h1>' + obj.itemname + '</h1><br />'
    msg+= '<h2>Rp. '+ this.commonService.formatNumber(obj.price) +',-</h2>'
    msg+= '<br />'
    msg+= '<br />'
    msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+this.submissionId+'/1">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'PadiNET BudgetingApp'
    this.mailService.postMail({
      recipient:'puji@padi.net.id,'+obj.creatoremail+' ',
      msg:msg,
      subject:'Price for Your Purchasing Submission  '
    },
    callback
    )
  }
  warehouseAlert(obj,callback){
    let msg = 'Hi, the final price for ' + Object.name+' has been set <br />'
    msg+= '<h1>'+obj.itemname+'</h1><br />'
    msg+= '<br />'
    msg+= '<br />'
    msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+this.submissionId+'/1">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'PadiNET BudgetingApp'
    this.mailService.postMail({
      recipient:'rara@padi.net.id',msg:msg,subject:'Price for Purchasing submission '+obj.itemname+' has been set '
    },callback)
  }
}
