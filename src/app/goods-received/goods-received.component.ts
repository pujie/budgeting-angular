import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubmissionService } from '../submission.service';
import { MailService } from '../mail.service';
import { MailTemplateService } from '../mail-template.service';
import { MatDialog, MAT_DATE_FORMATS } from '@angular/material';
import { ImageService } from '../image.service';
import { RoleService } from '../role.service';
import { CommonService } from '../common.service';

export const PADIDATEFORMAT = {
  parse:{dateInput:'YYYY-MM-DD'},
  display:{
    dateInput:'YYYY-MM-DD',
    monthYearLabel:'YYYY-MM-DD',
    dateA11yLabel:'YYYY-MM-DD',
    monthYearA11yLabel:'YYYY-MM-DD'
  }
}
@Component({
  selector: 'app-goods-received',
  templateUrl: './goods-received.component.html',
  styleUrls: ['./goods-received.component.css'],
  providers:[{provide:MAT_DATE_FORMATS,useValue:PADIDATEFORMAT}]
})
export class GoodsReceivedComponent implements OnInit {
  item = {
    subject:'',
    implementation_target:'',
    purchase_target:'',
    staff_name:'',
    submission_date:'',
    total_price:'',
    id:0,
    createuser:'',
    budgeting_number:'',
    creatoremail:'',itemname:''
  }
  submissionId
  receiveddate
  arrivaldate
  constructor(
    private activatedRoute: ActivatedRoute,
    private submission: SubmissionService,
    private mailService: MailService,
    private mailTemplateService: MailTemplateService,
    private dialog: MatDialog,
    private imageService: ImageService, private roleService:RoleService,
    private commonService: CommonService
  ) {
    this.submissionId = this.activatedRoute.snapshot.paramMap.get('submissionId')
    this.submission.getSubmissionById(this.submissionId,res=>{
      console.log("item props",res[0])
      this.item = res[0]
    })
  }
  getDateTime(obj,callback){
    console.log('OBJ received',obj)
    let out = obj.split('T')
    callback(out[0]+' '+out[1])
  }
  doAction(){
    this.getDateTime(this.arrivaldate,receivedtime=>{
      console.log('Do action',receivedtime)
      this.updatePrice(receivedtime);
    })
  }
  updatePrice(receivedtime){
    this.submission
    .setGoodReceived(
      {
        id:this.submissionId,
        arrivaldate:receivedtime
      },res => {
        console.log("Set Submission Status",res)
        this.submission.uploaditemreceivedbysubmissionid({
          submission_id:this.submissionId,
          suratjalan:document.getElementById("profileImage").getAttribute("src")
        },res => {
          console.log("Upload Suratjalan",res)
          this.roleService.getRolesEmails({identifiers:['"warehouse"','"purchase"']},warehouse=>{
            console.log("users",warehouse)
            this.commonService.extractMail(warehouse,mailArray=>{
              this.mailService.postMail({
                recipient:this.item.creatoremail,
                cc:mailArray,
                msg:this.mailTemplateService.itemReceived({
                  creator:this.item.staff_name,
                  itemName:this.item.itemname,
                  submissionId:this.submissionId
                  }),
                  subject:'Item Received confirm ('+this.item.subject+' - '+this.item.budgeting_number+')'
              },mail=>{
                window.location.href = '/landing'
              }
              )
            })
        })
        })
      })
  }
  ngOnInit() {
  }
  showUploadDialog(){
    document.getElementById("uploader").click()    
  }
  uploadFile(event){
    this.imageService.loadImage1(event,1080,result=>{
      document.getElementById('profileImage').setAttribute('src',result)
    })
  }
}
