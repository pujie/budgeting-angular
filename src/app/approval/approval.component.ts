import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material';
import { ApprovalDialogComponent } from '../approval-dialog/approval-dialog.component';
import { CommonService } from '../common.service';
import { MailService } from '../mail.service';
import { MailTemplateService } from '../mail-template.service';

@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {
submission = {id:0,subject:'',submission_date:'',user_id:0,staff_name:'',creatoremail:'',implementation_target:'',purchase_target:'',
city_id:0,createuser:'',budgeting_number:'',itemname:'',totalprice:0,finalprice:0,purchase_reason:''}
submission_detail={
  id: 0,
  submission_id: 0,
  product_id: 0,
  vendor_id: 0,
  itemname: "",
  brand: "",
  partnumber: "-",
  description: "",
  amount: 0,
  discountlevel: 0,
  proposed_vendor: "",
  proposed_price: 0,
  proposed_totalprice: 0,
  vendor: "",
  price: 0,
  totalprice: 0,
  final_price: null,
  information: " ",
  purchase_reason: "",
  placement_location: "",
  guarantee: "",
  ppn: 0,
  ongkir: 0,
  note: "",
  purchase_date: null,
  arrivaldate: null,
  verificationreason: null,
  reject_reason: "null",
  suratjalan: null,
  createuser: "",
  createdate: "",
  status: "0",
  creatormail: "",
  city_id: 1,
}
original_budget = {
  budget_limit: 0,
  budgetused: 0,
  budget_limit_city: 0,
  budgetused_city: 0
}
month
year
quarter
listOfComparisonVendors
budget_limit
budget_approve
current_budget
budgetused
budget_limit_city
budgetused_city
budget_approve_city
current_budget_city
cantApprove = false
cantReject = false
vendorName
totalPrice
logindata= {
  email: '',
  id: '',
  name: ''
}
dialogResult = {
  'approved':2,
  'rejected':3
}
useVendorComparisonData=false
vendorComparisonData={
  vendor:'',
  price:0,
  amount:1,
  ppn:0,
  ongkir:0
}
tempTotalPrice
  constructor(
    private submissionService: SubmissionService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private userService: UserService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private mailService: MailService,
  ) {
    this.auth.isLogin(result => {
      this.logindata = result
          if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
            this.router.navigate(['/login']);
          }
        this.logindata.name.toLowerCase()
    });
    this.getSubmissionId(id=>{
      this.submissionService.getSubmissionById(id,submission=>{
        console.log("submission got",submission)
        this.submission = submission[0]
        this.month=this.datePipe.transform(this.submission.purchase_target, 'MM')
        this.year=this.datePipe.transform(this.submission.purchase_target, 'yyyy')
        this.getQuarter(this.month,quarter=>{
          this.getDivision({user:submission[0].createuser},division=>{
            this.getBudgets({month:this.month,year:this.year,quarter:quarter,division:division})
          })
        })
      })
      this.submissionService.getSubmissionDetailBySubmissionId(id,submissions=>{
        console.log("Submission detail got",submissions)
        this.submission_detail = submissions[0]
        this.tempTotalPrice = submissions[0].proposed_totalprice
        this.submissionService.getSubmissionDetailVendor(submissions[0].id,vendors=>{
          console.log("Vendors",vendors)
          this.listOfComparisonVendors = vendors
        })
      })

    })
  }
  getBudgets(obj){
    console.log('Get Budgets OBJ',obj)
    this.submissionService.getbudget({
      city_id:this.submission_detail.city_id,
      year:obj.year,
      quarter:obj.quarter,
      division:obj.division
    },res => {
        console.log("res getbudget",res)
        if(res.length>0){
          this.original_budget.budgetused = res[0].budgetused
          this.original_budget.budget_limit = res[0].budget_limit
          this.budgetused = res[0].budgetused
          this.current_budget = res[0].budgetbeforeapprove
          this.budget_limit = res[0].budget_limit
          this.budget_approve = res[0].budgetbeforeapprove - this.submission_detail.proposed_totalprice
        }else
        {
          console.log("Plafon not set yet")
        }
    })
    this.submissionService.getcitybudgetlimit({
      city_id:this.submission_detail.city_id,
      year:this.year,
      quarter:obj.quarter},res => {
        console.log("res getbudget city",res[0])
        this.original_budget.budgetused_city = res[0].budgetused
        this.original_budget.budget_limit_city = res[0].budget_limit
        this.budget_limit_city = res[0].budget_limit
        this.current_budget_city = res[0].budgetbeforeapprove
        this.budgetused_city = res[0].budgetused
        console.log("current budget city",res[0].budgetused,"submission detail prp total price",this.submission_detail.proposed_totalprice)
        this.budget_approve_city = res[0].budgetbeforeapprove - this.submission_detail.proposed_totalprice
    })
  }
  getQuarter(month,callback){
    if (parseInt(month)>=1&&parseInt(month)<=3) {
      callback('1')
    } else if (parseInt(month)>=4&&parseInt(month)<=6) {
      callback('2')
    } else if (parseInt(month)>=7&&parseInt(month)<=9) {
      callback('3')
    } else {
      callback('4')
    }
  }
  getSubmissionId(callback){
    callback(this.activatedRoute.snapshot.paramMap.get('id'))
  }
  ngOnInit() {
  }
  getDivision(obj,callback){
    this.userService.getuserByName(obj.user, result =>{
      callback(result[0].division_id)
    })
  }
  getTotalPrice(submission_detail_id,callback){
    console.log("Submission Detail Id",submission_detail_id)
    this.totalPrice = 0
    this.submissionService.getSubmissionDetailBySubmissionId(this.submission.id,result =>{
      console.log("submission detail result",result)
      this.submissionService.getSubmissionDetails(submission_detail_id,result => {
        console.log("Result getSubmissionDetails",result)
        for(var i=0;i<result.length;i++){
          console.log("Proposed total price",result[i].proposed_totalprice);
          this.totalPrice+=result[i].proposed_totalprice
        }
        callback(this.totalPrice)
      })
    })
  }
  selectVendor(selectedVendor){
    this.unselectVendor()
    selectedVendor.selected = true
    var total = selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir
    this.budget_approve_city = this.budget_limit_city - (selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir)
    this.budget_approve = this.budget_limit-(selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir)
    this.useVendorComparisonData = true
    this.vendorComparisonData.vendor = selectedVendor.name
    this.vendorComparisonData.price = selectedVendor.price
    this.vendorComparisonData.ppn = selectedVendor.ppn
    this.vendorComparisonData.ongkir = selectedVendor.ongkir
  }
  unselectVendor(){
    this.listOfComparisonVendors.forEach(element => {
      element.selected = false;
    });
    this.resetSelect()
  }
  resetSelect(){
    this.submission_detail.proposed_totalprice = this.tempTotalPrice
    this.budget_approve_city = this.original_budget.budget_limit_city - this.original_budget.budgetused_city-this.submission_detail.proposed_totalprice
    this.useVendorComparisonData = false
    this.budget_approve = this.original_budget.budget_limit - this.original_budget.budgetused - this.submission_detail.proposed_totalprice
    this.vendorComparisonData.price = this.tempTotalPrice
  }
  approvalMail(approval,callback){
    let msg = 'Hi '+ this.submission_detail.createuser +'<br /> '
    msg+= 'Your purchasing submission has '+(approval.approvalStatus==this.dialogResult.approved?"Approved":"Rejected")+' <br />'
    msg+= '<h1>' + this.submission_detail.itemname + '</h1><br />'
    msg+= '<h2>Rp. '+ this.commonService.formatNumber(this.submission_detail.price) +',-</h2>'
    msg+= '<br />'
    if(approval.approvalStatus == this.dialogResult.rejected){
      msg+= '<br />Reason : '+approval.rejectReason+'<br /> '
    }
    msg+= '<br />'
    msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+this.submission.id+'/1">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'PadiNET BudgetingApp'
    this.mailService.postMail({
      recipient:approval.creatoremail,
      msg:msg,
      cc:'yenny.nurwiani@padi.net.id,yenny.nurwiani@padi.net.id',
      subject:'Your Purchasing Submission ('+(approval.approvalStatus==this.dialogResult.approved?'Approved':'Rejected')+') '
    },
    callback
    )
  }
  openDialogProduct(submission_detail_id:Number, dialog_type:Number): void {
    this.totalPrice=0;
    console.log("opendialog invoked",this.submission_detail)
    this.getTotalPrice(submission_detail_id,result =>{
      console.log("Result of GetTotalPrice",result,this.logindata.id)
      this.auth.checkIfUserCanApprove(result,this.logindata.id,can_approve => {
        console.log("CanApproVe",can_approve)
          const dialogRef = this.dialog.open(ApprovalDialogComponent, {
            width: '350px',
            data: {id: submission_detail_id, status: dialog_type,
              canApprove: can_approve,action:'Approve '//this.canApprove
            }
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log("Approval Result",result)
            console.log("THIS submission",this.submission)
            let approval
            if(result != null){
              approval = result
              approval.creatoremail = this.submission.creatoremail
              
              if(result.approvalStatus == this.dialogResult.approved){
                if(this.useVendorComparisonData == true){
                  this.submission_detail.vendor = this.vendorComparisonData.vendor
                  this.submission_detail.price = this.vendorComparisonData.price
                  this.submission_detail.ppn = this.vendorComparisonData.ppn
                  this.submission_detail.totalprice = (this.submission_detail.amount*this.vendorComparisonData.price)+this.vendorComparisonData.ppn+this.vendorComparisonData.ongkir
                  this.submission_detail.ongkir = this.vendorComparisonData.ongkir
                  this.submission_detail.status = "2"
                  console.log("this.submission_detail", this.submission_detail);
                  this.submissionService.updatesubmissiondetail(this.submission_detail, result => {
                    if(result != null){
                      console.log("Approval Result Approved : ",result)
                      this.submissionService.setSubmissionDetailStatus({id:this.submission_detail.id,status:2},resultUpdated=>{
                        console.log('resultUpdated',resultUpdated)
                        this.approvalMail(approval,()=>{
                          this.router.navigate(['/summary']);
                        })
                        })
                    }
                  })
                }else{
                  this.submission_detail.vendor = this.vendorName
                  this.submission_detail.price = this.submission_detail.proposed_price
                  this.submission_detail.ppn = 0
                  this.submission_detail.ongkir = 0
                  this.submissionService.updatesubmissiondetail(this.submission_detail,result=>{
                    if(result!=null){
                      this.submissionService.setSubmissionDetailStatus({id:this.submission_detail.id,status:2},resultUpdated=>{
                        this.approvalMail(approval,()=>{
                          console.log("resultUpdated",resultUpdated)
                          this.router.navigate(['/summary']);
                        })  
                      })    
                    }
                  })
                }
              }else if(result.approvalStatus == this.dialogResult.rejected){
                console.log("Approval Result Rejected : ",result)
                this.submissionService.setSubmissionDetailStatus({id:this.submission_detail.id,status:3},resultUpdated=>{
                  console.log('resultUpdated',resultUpdated)
                  this.approvalMail(result,()=>{
                    this.router.navigate(['/summary']);
                  })
                })
              }
            }else{
              console.log('result is null');
            }
          })
      })
    })
  }

}
