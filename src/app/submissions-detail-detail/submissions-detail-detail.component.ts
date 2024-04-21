import { Component, OnInit, Inject } from '@angular/core';
import {  MatSelectModule } from '@angular/material/select';
import { MatTableDataSource }from '@angular/material/table'
import { MatIconRegistry }from '@angular/material/icon'
          import { MatSnackBar }from '@angular/material/snack-bar'
          import { MatPaginator }from '@angular/material/paginator'          
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog }from '@angular/material/dialog'
import { DomSanitizer } from '@angular/platform-browser';
import { SubmissionService } from '../submission.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import { PlafonsService } from '../plafons.service';
import { VendorService } from '../vendor.service';
import { CommonConfirmerComponent } from '../common-confirmer/common-confirmer.component';
import { MailService } from '../mail.service';
import { RoleService } from '../role.service';
import { MailTemplateService } from '../mail-template.service';
import { NotesService } from '../notes.service';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { CommonService } from '../common.service';
//import { resolveTxt } from 'dns';

export interface DialogData {
  id: Number;
  status: Number;
  canApprove: boolean;
  listOfVendors:any;
  amount:number;
}

@Component({
  selector: 'app-submissions-detail-detail',
  templateUrl: './submissions-detail-detail.component.html',
  styleUrls: ['./submissions-detail-detail.component.css']
})
export class SubmissionsDetailDetailComponent implements OnInit {
    note={
      description:'',
      state:'comparationvendor'
    }
	  logindata= {
      email: '',
      id: '',
      name: ''
    }
    dialogStatus = {
      'delete':0,
      'not_known':1,
      'approve':2,
      'reject':3,
      'vendor_comparation':4
    }
    dialogResult = {
      'approved':1,
      'rejected':2
    }
    roleType = {
      'submitter':1,
      'approval1':2,
      'approval2':3,
      'approval3':4,
      'approval4':5,
      'purchase':6,
      'admin':7,
      'plafoncreator':8,
      'realizationauth':9
    }
    submissionDetailStatus = {
      'Not Active':0,
      'Not_Approved':1,
      'Approved_not_bought':2,
      'Rejected':3,
      'Approved_paid':4,
      'Approved_bought_not_paid':5,
      'Not_known':6,
      'Verified':9
    }
  	submissionId:number;
    fieldArray :any = []
    listOfComparisonVendors:any
    vendorComparisonData={
      vendor:'',
      price:0,
      amount:1,
      ppn:0,
      ongkir:0
    }
    vendorName=''
    discountPrice:any
  	submission_detail = {
      id:0,
      submission_id: '',
      itemname: '',
      brand: '',
      partnumber: '',
      description: '',
      amount: 0,
      information: '',
      purchase_reason: '',
      city_id:1,
      placement_location: '',
      proposed_price:0,
      proposed_totalprice:0,
      vendor: '',
      price: 0,
      ppn: 0,
      ongkir: 0,
      discountlevel:0,
      vendor_id: '',
      totalprice: 0,
      createuser:'',
      status: 0,
      creatoremail:''
    }
    submisssion = {
      budgeting_number: "",
      createuser: "",
      id: 0,
      implementation_target: "",
      purchase_target: "",
      staff_name: "",
      subject:"",
      creatoremail:''
    }
    original_budget = {
      budget_limit: 0,
      budgetused: 0,
      budget_limit_city: 0,
      budgetused_city: 0
    }
    alreadyPreApproval = true
  	hidePlafon = true;
    totalPrice=0;
    canApprove=false;
    preapproval = true
    normal=true;
    useVendorComparisonData=false

    month:any
    year:any
    quarter:any
    division:any

    listOfPlafons:any
    budgetused:any
    budget_limit:any
    budget_approve:any
    budgetused_city=0
    budget_limit_city=0
    budget_approve_city=0

    warningLimit=false
    warningLimitCity=false

    tempTotalPrice:any

    approvalTable = [
      {2:2500000},{3:5000000},{4:5000000},{5:50000001}
    ]
    cantApprove = true
    cantReject = true
    listOfVendors:any
    addReviewEnable = true
    current_budget_city:any
    current_budget:any
    userDivision:any
    pembanding : {price:any,ppn:any,ongkir:any} = {price:0,ppn:0,ongkir:0}
    tmpPurchaseReason = ''
    shortenertext:any
constructor(
  	private submissionService: SubmissionService,
    private vendorService: VendorService,
    private plafonsService: PlafonsService,
    private userService: UserService,
  	private router: Router,
  	private auth: AuthService,
    private location: Location,
  	private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private commonConfirmer: MatDialog,
    private mailService: MailService,
    private mailTemplateService: MailTemplateService,
    private roleService: RoleService,
    private noteService: NotesService,private commonService: CommonService
    ) {
    var temp;
    const review = +this.activatedRoute.snapshot.paramMap.get('review')!
  	this.submissionId = +this.activatedRoute.snapshot.paramMap.get('id')!;
  	this.auth.isLogin((result:any) => {
  	    this.logindata = result
  	      	if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
              this.router.navigate(['/login']);
            }
          this.logindata.name.toLowerCase()
  	});
    this.vendorService.getVendors((result:any) => {
      console.log('resultv --> test', result)
        this.listOfVendors = result
      })

  	this.submissionService.getSubmissionDetailBySubmissionId(this.submissionId, (result:any) =>{
      let that = this
      console.log("Result 1",result)
      this.submission_detail = result[0]
      this.tmpPurchaseReason = this.submission_detail.purchase_reason
      this.discountPrice = (result[0].proposed_price*result[0].amount)-result[0].proposed_totalprice
      this.tempTotalPrice = result[0].proposed_totalprice
      this.vendorComparisonData.price = result[0].proposed_totalprice
      console.log("SubmissionDetail",this.submission_detail)
      console.log("STATUS STATUS STATUS:::",result[0].status)
      if(result[0].status == this.submissionDetailStatus.Not_known){
        this.submissionService.getSubmissionDetailVendor(this.submission_detail.id, (result:any) => {
          this.listOfComparisonVendors = result
          console.log('vendor', result)
          for(let index in this.listOfComparisonVendors){
            this.vendorService.getVendor({id:this.listOfComparisonVendors[index].vendor_id}, (result:any) => {
              this.listOfComparisonVendors[index].vendorName = result.name
              this.listOfComparisonVendors[index].selected = false
            })
          }
          this.readMore()
        })
        this.auth.isMemberOf({user_id:this.logindata.id,role_id:that.roleType.plafoncreator},(result:any) => {
          this.readMore()
          if(result.length>0){
            console.log("Hide Plafon A")
            this.hidePlafon = false
          }else{
            console.log("Hide Plafon B")
            console.log("isMember Result",result)
            this.alreadyPreApproval = false
          }
        })
      }else if(result[0].status == this.submissionDetailStatus.Verified){
        this.readMore()
        this.auth.isMemberOf({user_id:this.logindata.id,role_id:that.roleType.purchase},(result:any) => {
          if(result.length>0){
            console.log("Hide Plafon C")
            this.preapproval = false



            this.submissionService.getSubmissionDetailVendor(this.submission_detail.id, (result:any) => {
              this.listOfComparisonVendors = result
              console.log('vendor', result)
              for(let index in this.listOfComparisonVendors){
                this.vendorService.getVendor({id:this.listOfComparisonVendors[index].vendor_id}, (result:any) => {
                  this.listOfComparisonVendors[index].vendorName = result.name
                  this.listOfComparisonVendors[index].selected = false
                })
              }
            })

            

          }else{
            console.log("Hide Plafon D")
            this.preapproval = true
            this.hidePlafon = true
            this.normal = false
            this.alreadyPreApproval = true
            }
        })
      }
      this.vendorService.getVendor({id:result[0].vendor_id}, (result:any) => {
        this.vendorName = result.name
      })
      this.submissionService.getSubmissionById(this.submission_detail.submission_id, (results:any) =>{
        console.log('Submission retrieved',results)
        this.submisssion = results[0]
        this.plafond()
      });

      this.fieldArray = (JSON.parse(localStorage.getItem('gVendor')!)==null)?JSON.parse(localStorage.getItem('gVendor')!):[]
      this.getTotalPrice(this.submission_detail.id,(result:any) =>{
        this.auth.checkIfUserCanApprove(result,this.logindata.id,(can_approve:any) => {
          this.cantApprove = !can_approve
          this.cantReject = !can_approve
        })
      })

    });
  }
  clearGVendors(){
    localStorage.removeItem('gVendor')
    console.log("gVendors cleared")
    this.fieldArray = []
  }
  addReview(){
    this.submissionService.setSubmissionDetailStatus({id: this.submission_detail.id, status: 6}, (result:any) => {
      if(result != null){
        this.getTemporaryVendors((_vendors:any)=>{
          this.doMailJob(_vendors)
        })
      }else{
        alert('Pre-approval not saved')
      }
    })
  }
  getTemporaryVendors(callback:any){
    let _vendors = ''
    console.log("FIELDARRAY",this.fieldArray)
    for(let index in this.fieldArray){
      _vendors+='<tr><td>'
      _vendors+= this.fieldArray[index].vendorName+' (Rp. '+this.commonService.formatNumber(this.fieldArray[index].price)+',-)'
      _vendors+='</td></tr>'
    }
    callback(_vendors)
  }
  addReview_(){
    var idx
    var err = false
    var vendorComparison
    if(this.fieldArray.length < 1)
    {
      alert('Data tidak lengkap, mohon mengisi semua input')
    }else{
      this.submission_detail.totalprice =  this.submission_detail.proposed_totalprice//0
      this.submission_detail.price = this.submission_detail.proposed_price//0
      this.submissionService.updatesubmissiondetail(this.submission_detail, (result:any) => {
        this.submission_detail.price = this.submission_detail.proposed_price
        this.submission_detail.totalprice = this.submission_detail.proposed_totalprice
        if(result != null){
          let _vendors = ''
          console.log("FIELDARRAY",this.fieldArray)
          for(let index in this.fieldArray){
            _vendors+='<tr><td>'
            _vendors+= this.fieldArray[index].vendorName+' (Rp. '+this.commonService.formatNumber(this.fieldArray[index].price)+',-)'
            _vendors+='</td></tr>'
            idx = parseInt(index)
            this.fieldArray = this.listOfComparisonVendors
            vendorComparison = {
              submission_detail_id: this.fieldArray[index].submission_detail_id,
                vendor_id: this.fieldArray[index].vendor_id,
                price: this.fieldArray[index].price,
                ppn: this.fieldArray[index].ppn,
                ongkir: this.fieldArray[index].ongkir,
                createuser: this.logindata.name
            }
            this.submissionService.saveSubmissionDetailVendor(vendorComparison, (result:any) => {
              if (result == null) {
                alert('Data not saved!')
                err = true
              };
            })

              if(idx == this.fieldArray.length-1 && err == false){
                this.submissionService.setSubmissionDetailStatus({id: this.submission_detail.id, status: 6}, (result:any) => {
                  if(result != null){
                    this.doMailJob(_vendors)
                  }else{
                    alert('Pre-approval not saved')
                  }
                })
              }
            }
          }
        })
      }
    }
    doMailJob(_vendors:any){
      this.clearGVendors()
      this.commonConfirmer.open(CommonConfirmerComponent,{
        //duration:3600,
        //verticalPosition:'top',
        data:{
          alertText:'Vendor pem_banding telah disimpan',
          alertDetail:'Data telah tersimpan'
        }
      })
      let level = ''
      let approver = 'approval1'
      switch (true){
        case ((this.submission_detail.proposed_totalprice+0)<2500000) :
          console.log("First Level",this.submission_detail.proposed_totalprice)
          level = 'First Level'
          approver = 'approval1'
        break
        case (2500000 < (this.submission_detail.proposed_totalprice+0) && (this.submission_detail.proposed_totalprice+0) < 5000000) :
          console.log("Second Level",this.submission_detail.proposed_totalprice)
          level = 'Second Level'
          approver = 'approval2'
        break
        case (5000000 < (this.submission_detail.proposed_totalprice+0) && (this.submission_detail.proposed_totalprice+0) < 50000000) :
          console.log("Third Level",this.submission_detail.proposed_totalprice)
          level = 'Third Level'
          approver = 'approval3'
        break
        case ((this.submission_detail.proposed_totalprice+0)>50000000) :
          console.log("Highest Level",this.submission_detail.proposed_totalprice)
          level = 'Highest Level'
          approver = 'approval4'
        break
      }
      let msg = 'A Vendor Comparison Review has created by '+ this.logindata.name +'<br /> '
      msg+= '<h1>' + this.submission_detail.itemname + '</h1><br />'
      msg+= '<h2>Vendors</h2>'
      msg+= '<table>'
      msg+= _vendors
      msg+= '</table>'
      msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+this.submissionId+'/1">'
      msg+= 'Go to Application'
      msg+= '</a> <br /><br /><br />'
      msg+= 'PadiNET BudgetingApp'
      this.roleService.getRoleMail({identifier:approver},(res:any)=>{
        this.mailService.postMail({
          recipient:res[0].email,
          msg:msg,
          subject:'Purchase Vendor Comparison ('+level+')'
        },
        (mail:any)=>{
          window.location.href = "/landing"
        })

      })
    }
    resendMail(){
      console.log("Resendmail invoked")
      this.mailService.postMail({
        recipient: this.logindata.email,
        msg:this.mailTemplateService.submissionCreateNotification(
          {
            creator:this.logindata.name,
            itemName:this.submission_detail.itemname,
            submissionId:this.submissionId
          }
        ),subject:'Resend Purchase Submission ('+this.submission_detail.itemname+')'
      },(mail:any)=>{
        console.log("Resend Mail Result")
      })
    }
    resetSelect(){
      console.log("Reset Select")
      console.log("Original budget limit city",this.original_budget.budget_limit_city)
      console.log("Original budget used",this.original_budget.budgetused_city)
      console.log("Proposed total price",this.submission_detail.proposed_totalprice)
      this.submission_detail.proposed_totalprice = this.tempTotalPrice
      this.budget_approve_city = this.original_budget.budget_limit_city - this.original_budget.budgetused_city-this.submission_detail.proposed_totalprice
      //this.budget_approve = this.budgetused-this.tempTotalPrice
      this.useVendorComparisonData = false
      this.budget_approve = this.original_budget.budget_limit - this.original_budget.budgetused - this.submission_detail.proposed_totalprice
      this.vendorComparisonData.price = this.tempTotalPrice
    }
    toggleSelectVendor(selectedVendor:any){
      if(selectedVendor.selected){
        this.unselectVendor()
      }else{
        this.selectVendor(selectedVendor)
      }
    }
    selectVendor(selectedVendor:any){
      this.unselectVendor()
      selectedVendor.selected = true
      var total = selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir
      this.budget_approve_city = this.budget_limit_city - (selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir) //this.budgetused_city-total
      //this.budget_approve = this.budgetused-total

      //this.budget_approve = this.budgetused-(selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir)
      this.budget_approve = this.budget_limit-(selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir)

      this.useVendorComparisonData = true
      this.vendorComparisonData.vendor = selectedVendor.vendorName
      this.vendorComparisonData.price = selectedVendor.price
      this.vendorComparisonData.ppn = selectedVendor.ppn
      this.vendorComparisonData.ongkir = selectedVendor.ongkir
    }
    unselectVendor(){
      this.listOfComparisonVendors.forEach((element:any) => {
        element.selected = false;
      });
      this.resetSelect()
    }
    plafond(){
      this.month=this.datePipe.transform(this.submisssion.purchase_target, 'MM')
      this.year=this.datePipe.transform(this.submisssion.purchase_target, 'yyyy')
      console.log("Submission => ",this.submisssion)
      if (this.month>=1&&this.month<=3) {
        this.quarter=1
      } else if (this.month>=4&&this.month<=6) {
        this.quarter=2
      } else if (this.month>=7&&this.month<=9) {
        this.quarter=3
      } else {
        this.quarter=4
      }
      console.log("Month =>",this.month)
      console.log("Quarter =>",this.quarter)
      this.userService.getuserByName(this.submission_detail.createuser, (result:any) =>{
        this.userService.getDivisionsByUserId(result[0].id, (results:any) =>{
          this.userDivision = results[0].division
          if (results[0].division=="Sales") {
            this.division=1
          } else if (results[0].division=="Teknis") {
            this.division=2
          } else if (results[0].division=="Keuangan") {
            this.division=3
          } else if (results[0].division=="Umum") {
            this.division=4
          }
          console.log("user Division",this.division)
          console.log("SubmissionDetail",this.submission_detail)
          this.submissionService.getbudget({
            city_id:this.submission_detail.city_id,
            year:this.year,
            quarter:this.quarter,
            division:this.division},(res:any) => {
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
            quarter:this.quarter},(res:any) => {
              console.log("res getbudget city",res[0])
              this.original_budget.budgetused_city = res[0].budgetused
              this.original_budget.budget_limit_city = res[0].budget_limit
              this.budget_limit_city = res[0].budget_limit
              this.current_budget_city = res[0].budgetbeforeapprove
              this.budgetused_city = res[0].budgetused
              console.log("current budget city",res[0].budgetused,"submission detail prp total price",this.submission_detail.proposed_totalprice)
              this.budget_approve_city = res[0].budgetbeforeapprove - this.submission_detail.proposed_totalprice

              //this.budgetused = res[0].budgetused
              console.log("Budget Approve City",this.budget_approve_city)
              console.log("Budget Approve Division",this.budget_approve)
          })
        })
      });
    }

  	backToLastPage() {
		  this.location.back();
	  }

    ngOnInit() {
    }

    deleteFieldValue(index:any,vendor_id:any) {
      console.log("vendor_id",vendor_id)
      this.submissionService.deleteVendorToCompare({vendor_id:vendor_id,submission_detail_id:this.submission_detail.id},()=>{
        this.listOfComparisonVendors.splice(index,1)
        this.fieldArray.splice(index, 1);          
      })
    }

    numCheck(event: any) {
      const pattern = /[0-9\ ]/;

      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    getTotalPrice(submission_detail_id:any,callback:any){
      console.log("Submission Detail Id",submission_detail_id)
      this.totalPrice = 0
      this.submissionService.getSubmissionDetailBySubmissionId(this.submissionId,(result:any) =>{
        console.log("submission detail result",result)
        this.submissionService.getSubmissionDetails(result[0].submission_id,(result:any) => {
          console.log("Result getSubmissionDetails",result)
          for(var i=0;i<result.length;i++){
            console.log("Proposed total price",result[i].proposed_totalprice);
            this.totalPrice+=result[i].proposed_totalprice
          }
          callback(this.totalPrice)
        })
      })
    }
    openDialogProduct(submission_detail_id:Number, dialog_type:Number): void {
      console.log("dialog_type",dialog_type,this.dialogStatus.vendor_comparation)
      this.totalPrice=0;
      console.log("opendialog invoked")
      this.getTotalPrice(submission_detail_id,(result:any) =>{
        console.log("Result of GetTotalPrice",result)
        this.auth.checkIfUserCanApprove(result,this.logindata.id,(can_approve:any) => {
          if(dialog_type == this.dialogStatus.vendor_comparation){
            console.log("AddVendor Invoked")
            const dialogRef = this.dialog.open(SubmissionsDetailDetailDialog, {
              width: '750px',
              data: {
                id: submission_detail_id,
                status: dialog_type,
                amount: this.submission_detail.amount,
                canApprove: can_approve,//this.canApprove
                listOfVendors:this.listOfVendors
              }
            })
            dialogRef.afterClosed().subscribe(vendorToCompare => {
              if(vendorToCompare != null){
                console.log("Add Vendor Result",vendorToCompare)
                this.commonConfirmer.open(CommonConfirmerComponent,{
                  //duration:3600,
                  //verticalPosition:'top',
                  data:{
                    alertText:'Vendor pemb_anding telah ditambahkan',
                    alertDetail:'Data telah tersimpan'
                  }
                })
                this.fieldArray.push(vendorToCompare)
                this.listOfComparisonVendors.push(vendorToCompare)
                this.vendorService.saveSubmissionDetailVendor(
                  {
                    vendor_id:vendorToCompare.vendor_id,
                    submission_detail_id:vendorToCompare.submission_detail_id,
                    createuser:this.logindata.name,price:vendorToCompare.price,
                    ppn:vendorToCompare.ppn,
                    ongkir:vendorToCompare.ongkir
                  },(res:any)=>{
                    console.log("Success save submissiondetail_vendor",res)
                  })
                localStorage.setItem("gVendor",JSON.stringify(this.fieldArray))
                console.log("Field Array",this.fieldArray)
              }else{
                alert("vendor to compare not saved, please input again")
              }
            })
          }else {
            const dialogRef = this.dialog.open(SubmissionsDetailDetailDialog, {
              width: '350px',
              data: {id: submission_detail_id, status: dialog_type,
                canApprove: can_approve//this.canApprove
              }
            });
            dialogRef.afterClosed().subscribe((result:any) => {
              console.log("Approval Result",result)
              console.log("THIS SUBMISSSION",this.submisssion)
              let approval:any
              if(result != null){
                approval = result
                approval.creatoremail = this.submisssion.creatoremail
                
                if(result.approvalStatus == this.dialogResult.approved){
                  if(this.useVendorComparisonData == true){
                    this.submission_detail.vendor = this.vendorComparisonData.vendor
                    this.submission_detail.price = this.vendorComparisonData.price
                    this.submission_detail.ppn = this.vendorComparisonData.ppn
                    this.submission_detail.totalprice = (this.submission_detail.amount*this.vendorComparisonData.price)+(this.submission_detail.amount*this.vendorComparisonData.ppn)+this.vendorComparisonData.ongkir
                    this.submission_detail.ongkir = this.vendorComparisonData.ongkir
                    this.submission_detail.status = 2
                    console.log("this.submission_detail", this.submission_detail);
                    this.submissionService.updatesubmissiondetail(this.submission_detail, (result:any) => {
                      if(result != null){
                        console.log("Approval Result Approved : ",result)
                        this.approvalMail(approval,()=>{
                          this.router.navigate(['/summary']);
                        })
                      }
                    })
                  }else{
                    this.submission_detail.vendor = this.vendorName
                    this.submission_detail.price = this.submission_detail.proposed_price
                    this.submission_detail.ppn = 0
                    this.submission_detail.ongkir = 0
                    this.submission_detail.status = 2
                    this.approvalMail(approval,()=>{
                      this.router.navigate(['/summary']);
                    })
              }
                }else if(result.approvalStatus == this.dialogResult.rejected){
                  console.log("Approval Result Rejected : ",result)
                  let rejectReason = result.rejectReason
                  this.submission_detail.status = 3
                  this.submissionService.updatesubmissiondetail(this.submission_detail, (result:any) => {
                    if(result != null){
                      this.submissionService.setSubmissionDetailStatus({status:3,id:submission_detail_id},(res:any)=>{
                        console.log("Approval Result rejected : ",res)
                        this.submissionService.updateRejectReason({reject_reason:rejectReason,id:submission_detail_id},(res:any)=>{
                        this.approvalMail(approval,()=>{
                          this.router.navigate(['/summary']);
                        })
                        })
                      })
                    }
                  })
                }
              }else{
                alert("Please check your authorization limit for budget again")
              }
            })
          }
        })
      })
    }
    edit(id:any){
      window.location.href = '/submission-edit/'+id
    }
    editPreApproval(submissionId:any){
      window.location.href = '/vendorReviewEdit/'+submissionId
    }
    approvalMail(approval:any,callback:any){
      let msg = 'Hi '+ this.submission_detail.createuser +'<br /> '
      msg+= 'Your purchasing submission has '+(approval.approvalStatus=="1"?"Approved":"Rejected")+' <br />'
      msg+= '<h1>' + this.submission_detail.itemname + '</h1><br />'
      msg+= '<h2>Rp. '+ this.commonService.formatNumber(this.submission_detail.price) +',-</h2>'
      msg+= '<br />'
      if(approval.approvalStatus == '2'){
        msg+= '<br />Reason : '+approval.rejectReason+'<br /> '
      }
      msg+= '<br />'
      msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+this.submissionId+'/1">'
      msg+= 'Go to Application'
      msg+= '</a> <br /><br /><br />'
      msg+= 'PadiNET BudgetingApp'
      this.mailService.postMail({
        recipient:approval.creatoremail,
        msg:msg,
        subject:'Your Purchasing Submission ('+(approval.approvalStatus=="1"?'Approved':'Rejected')+') '
      },
      callback
      )
    }
    shownotes(){
      console.log("Show notes",this.submissionId)
    this.dialog.open(NotesDialogComponent,{
      data:{
        submissionId:this.submissionId,
        createuser:this.logindata.name
      }
    })
    }
    readMore(){
      
      let that = this
      if(this.tmpPurchaseReason.length>30){
        this.tmpPurchaseReason = this.submission_detail.purchase_reason.substr(0,29)
        this.shortenertext = "More ..."
      }else{
        this.tmpPurchaseReason = this.submission_detail.purchase_reason
        this.shortenertext = "Less ..."
      }
    }
}

@Component({
  selector: 'app-submissions-detail-detail',
  templateUrl: 'submissions-detail-detail-dialog.html',
})

export class SubmissionsDetailDetailDialog {

  obj:any
  submissionId
  action
  reject=false
  reason:any
  canApprove=true
  vendorPembanding= true
  pembanding = {
        submission_detail_id: 0,
        vendor_id:0,
        vendorName:'',
        price:0,
        ppn:0,
        ongkir:0,
        amount:0,
        total:0
      }
  listOfVendors
  gVendors = []
      amount:any
      IntegerRegex = "/^-?[0-9][^\.]*$/";

  constructor(
    private location: Location,
    private vendorService: VendorService,
    private submissionService: SubmissionService,
    private router: Router,
    public dialogRef: MatDialogRef<SubmissionsDetailDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.pembanding.amount = data.amount
    console.log("Data",this.data)
    console.log('this.data.id', this.data.id)
    if (this.data.status==0) {
      this.action="Delete"
      this.canApprove=true
    }else if (this.data.status==2) {
      this.action="Approve"
      this.canApprove=this.data.canApprove
    }else if (this.data.status==3) {
      this.action="Reject"
      this.canApprove=true
      this.reject=true
    }else if (this.data.status == 4){
      this.action == 'vendor comparison'
      this.canApprove = true
      this.reject=false
      this.vendorPembanding = false
      this.submissionId = this.data.id
      this.pembanding={
        submission_detail_id: 0,
        vendor_id:0,
        vendorName:'',
        price:0,
        ppn:0,
        ongkir:0,
        amount:data.amount,
        total:0
      }
    }
    this.listOfVendors = this.data.listOfVendors
/*    this.vendorService.getVendors(result => {
      console.log('resultv', result)
        this.listOfVendors = result
      })*/
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addValue(id:any, name:any){
    this.pembanding.vendor_id = id
    this.pembanding.vendorName = name
    
  }
  onYesClick(data: DialogData): void {
    console.log("this.action",this.action)
    this.obj = {
      id:data.id,
      status:data.status
    }

    if (this.action=="Approve") {
      this.submissionService.setSubmissionDetailStatus(this.obj, (result:any) => {
        console.log("Success",result)
        this.dialogRef.close({approvalStatus:1});
      })
    } else if (this.action=="Reject") {
      this.submissionService.updateRejectReason({id:this.obj.id, reject_reason:this.reason}, (result:any) => {
        console.log("Success",result)
        this.dialogRef.close({approvalStatus:2,rejectReason:this.reason,id:this.obj.id});
      })
    }
  }

  addVendor(){
    this.pembanding.submission_detail_id = this.submissionId as number
    console.log('Tis pembandig',this.pembanding)
    this.dialogRef.close(this.pembanding)
  }
  getPPn(ev:any){
    console.log('Ev',ev)
    this.numCheck(event)
    this.pembanding.ppn = Math.round(0.11*this.pembanding.price)//*this.pembanding.amount
    console.log('Pem_banding PPn',this.pembanding.ppn)
    this.adjustTotal()
  }
  adjustTotal(){
    console.log("Price pem_banding",this.pembanding.price)
    console.log("Total pem_banding",this.pembanding.total)
    this.pembanding.total = (this.pembanding.amount*this.pembanding.price)+(this.pembanding.amount*this.pembanding.ppn)
  }
  numCheck(event: any) {
    const pattern = /[0-9\ ]/;
    console.log("Event Key Code",event.keyCode)

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)&& event.keyCode!=9) {
      event.preventDefault();
    }
  }
}
