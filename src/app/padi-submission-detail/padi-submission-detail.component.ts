import { Component, OnInit, Inject } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { VendorService } from '../vendor.service';
import { PlafonsService } from '../plafons.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Location} from '@angular/common'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

export interface DialogData {
  id: Number;
  status: Number;
  canApprove: boolean;
}

@Component({
  selector: 'app-padi-submission-detail',
  templateUrl: './padi-submission-detail.component.html',
  styleUrls: ['./padi-submission-detail.component.css']
})
export class PadiSubmissionDetailComponent implements OnInit {

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
    'Not_known':6
  }
  submissionId;
  fieldArray = []
  listOfComparisonVendors:any
  vendorComparisonData={
    vendor:'',
    price:0,
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
    status: 0
  }
  submission_details = []
  submisssion = {
    budgeting_number: "",
    createuser: "",
    id: 0,
    implementation_target: "",
    purchase_target: "",
    staff_name: "",
    subject:""
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
  current_budget:any
  budget_limit:any
  budget_approve:any
  current_budget_city=0
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
  private datePipe: DatePipe  
  ) {
  var temp;
  const review = +this.activatedRoute.snapshot.paramMap.get('review')!
  this.submissionId = +this.activatedRoute.snapshot.paramMap.get('id')!;
  console.log("submissionid",this.submissionId)
  this.auth.isLogin((result:any) => {
      this.logindata = result
          if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
          this.router.navigate(['/login']);
          }
        this.logindata.name.toLowerCase()
  });

  this.submissionService.getSubmissionDetails(this.submissionId, (result:any) =>{
    let that = this
    this.submission_details = result
    this.submission_detail = result[0]
    this.discountPrice = (result[0].proposed_price*result[0].amount)-result[0].proposed_totalprice
    this.tempTotalPrice = result[0].proposed_totalprice
    console.log("SubmissionDetail",this.submission_detail)
    if(result[0].status == this.submissionDetailStatus.Not_known){
      this.submissionService.getSubmissionDetailVendor(this.submissionId, (result:any) => {
        this.listOfComparisonVendors = result
        console.log('vendor', result)
        for(let index in this.listOfComparisonVendors){
          this.vendorService.getVendor({id:this.listOfComparisonVendors[index].vendor_id}, (result:any) => {
            this.listOfComparisonVendors[index].vendorName = result.name
            this.listOfComparisonVendors[index].selected = false
          })
        }
      })
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:that.roleType.plafoncreator},(result:any) => {
        if(result.length>0){
          console.log("Hide Plafond is false")
          this.hidePlafon = false
        }else{
          console.log("Hide Plafond is true A")
          this.alreadyPreApproval = false
        }
      })
    }else if(result[0].status == this.submissionDetailStatus.Not_Approved){
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:that.roleType.purchase},(result:any) => {
        if(result.length>0){
          console.log("Hide Plafond is true B")
          this.preapproval = false
        }else{
          console.log("Hide Plafond is true")
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
      this.submisssion = results[0]
      this.plafond()
    });


    this.getTotalPrice(this.submission_detail.id,(result:any) =>{
      console.log('Get Total price Result',result)
      this.totalPrice = result
      this.auth.checkIfUserCanApprove(result,this.logindata.id,(can_approve:any) => {
        console.log("can Approve",can_approve)
        this.cantApprove = !can_approve
        this.cantReject = !can_approve
      })
    })

  });
}
  addReview(){
    alert('OK')
    var idx
    var err = false
    var vendorComparison
    if(this.fieldArray.length < 1)
    {
      alert('Data tidak lengkap, mohon mengisi semua input')
    }else{
      this.submission_detail.totalprice = 0
      this.submission_detail.price = 0
      this.submissionService.updatesubmissiondetail(this.submission_detail, (result:any) => {
        if(result != null){
          for(let index in this.fieldArray){
            idx = parseInt(index)
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
              this.submissionService.setSubmissionDetailStatus({id: this.submissionId, status: 6}, (result:any) => {
                if(result != null){
                  alert('Pre-approval Saved')
                  this.location.back();
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

  resetSelect(){
    this.submission_detail.proposed_totalprice = this.tempTotalPrice
    this.budget_approve_city = this.current_budget_city-this.tempTotalPrice
    this.budget_approve = this.current_budget-this.tempTotalPrice      
    this.useVendorComparisonData = false
  }

  selectVendor(selectedVendor:any){
    for (var i = 0; i < this.listOfComparisonVendors.length; i++) {
      if (selectedVendor.vendor_id==this.listOfComparisonVendors[i].vendor_id) {
        this.listOfComparisonVendors[i].selected=true
      } else {
        this.listOfComparisonVendors[i].selected=false
      }
    console.log("this.listOfComparisonVendors", this.listOfComparisonVendors[i]);        
    }

    var total = selectedVendor.price+selectedVendor.ppn+selectedVendor.ongkir
    this.budget_approve_city = this.current_budget_city-total
    this.budget_approve = this.current_budget-total
    this.useVendorComparisonData = true
    this.vendorComparisonData.vendor = selectedVendor.vendorName
    this.vendorComparisonData.price = selectedVendor.price
    this.vendorComparisonData.ppn = selectedVendor.ppn
    this.vendorComparisonData.ongkir = selectedVendor.ongkir
  }

  plafond(){
    this.month=this.datePipe.transform(this.submisssion.purchase_target, 'MM')
    this.year=this.datePipe.transform(this.submisssion.purchase_target, 'yyyy')

    if (this.month>=1&&this.month<=3) {
      this.quarter=1
    } else if (this.month>=4&&this.month<=6) {
      this.quarter=2
    } else if (this.month>=7&&this.month<=9) {
      this.quarter=3
    } else {
      this.quarter=4
    }

    this.userService.getuserByName(this.submission_detail.createuser, (result:any) =>{
      this.userService.getDivisionsByUserId(result[0].id, (results:any) =>{
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
        this.submissionService.getbudget({
          placement_location:this.submission_detail.placement_location,
          year:this.year,
          quarter:this.quarter,
          division:this.division},(res:any) => {
          this.current_budget = res.current_budget
          this.budget_limit = res.budget_limit
          this.budget_approve  = res.budget_approve
        })


        this.plafonsService.getPlafons((resultss:any) => {
          this.listOfPlafons = resultss

          /*
          for (var i = 0; i < this.listOfPlafons.length; i++) {
            if (this.listOfPlafons[i].city==this.submission_detail.placement_location) {
              if (this.listOfPlafons[i].year==this.year) {
                if (this.listOfPlafons[i].quarter==this.quarter) {
                  if (this.listOfPlafons[i].division==this.division) {
                    this.current_budget=this.listOfPlafons[i].budget_limit-this.listOfPlafons[i].current_budget
                    this.budget_limit=this.listOfPlafons[i].budget_limit
                    this.budget_approve=this.current_budget-this.submission_detail.proposed_totalprice
                  }
                  this.current_budget_city=this.current_budget_city+this.listOfPlafons[i].current_budget
                  this.budget_limit_city=this.budget_limit_city+this.listOfPlafons[i].budget_limit
                } 
              }
            }
          }*/

          this.current_budget_city=this.budget_limit_city-this.current_budget_city
          this.budget_approve_city=this.current_budget_city-this.submission_detail.proposed_totalprice

          if (this.budget_approve<0) {
            this.warningLimit=true
          }

          if (this.budget_approve_city<0) {
            this.warningLimitCity=true
          }
        })
      })
    });
  }

  backToLastPage() {
    this.location.back();
  }

  ngOnInit() {
  }

  deleteFieldValue(index:any) {
    this.fieldArray.splice(index, 1);
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
    this.submissionService.getSubmissionDetail(submission_detail_id,(result:any) =>{
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
    console.log("dialog_type",dialog_type)
    this.totalPrice=0;
    console.log("opendialog invoked")
    this.getTotalPrice(submission_detail_id,(result:any) =>{
      this.auth.checkIfUserCanApprove(result,this.logindata.id,(can_approve:any) => {
        if(dialog_type == this.dialogStatus.vendor_comparation){
          const dialogRef = this.dialog.open(SubmissionsDetailDetailDialog, {
            width: '750px',
            data: {id: submission_detail_id, status: dialog_type, 
              canApprove: can_approve//this.canApprove
            }
          })
          dialogRef.afterClosed().subscribe(result => {
            if(result != null){
              alert("Vendor information saved")
              this.fieldArray.push(result)
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
          dialogRef.afterClosed().subscribe(result => {
            if(result != null){
              if(result == this.dialogResult.approved){
                alert("Submission Approved")
                if(this.useVendorComparisonData == true){
                  this.submission_detail.vendor = this.vendorComparisonData.vendor
                  this.submission_detail.price = this.vendorComparisonData.price
                  this.submission_detail.ppn = this.vendorComparisonData.ppn
                  this.submission_detail.ongkir = this.vendorComparisonData.ongkir
                  this.submission_detail.status = 2
                  console.log("this.submission_detail", this.submission_detail);
                  this.submissionService.updatesubmissiondetail(this.submission_detail, (result:any) => {
                    if(result != null){
                      this.router.navigate(['/summary']);
                    }
                  })
                }else{
                  this.submission_detail.vendor = this.vendorName
                  this.submission_detail.price = this.submission_detail.proposed_price
                  this.submission_detail.ppn = 0
                  this.submission_detail.ongkir = 0
                }
              }else if(result == this.dialogResult.rejected){
                alert("Submission Rejected")
                this.router.navigate(['/summary']);
              }
            }else{
              alert("Please check your authorization limit for budget again")
            }
          })
        }
      })
    })
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
pembanding={
      submission_detail_id: 0,
      vendor_id:0,
      vendorName:'',
      price:0,
      ppn:0,
      ongkir:0
    }
listOfVendors:any

constructor(
  private location: Location,
  private vendorService: VendorService,
  private submissionService: SubmissionService, 
  private router: Router, 
  public dialogRef: MatDialogRef<SubmissionsDetailDetailDialog>, 
  @Inject(MAT_DIALOG_DATA) public data: DialogData
) {

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
      ongkir:0
    }
  }
  this.vendorService.getVendors((result:any) => {
    console.log('resultv', result)
      this.listOfVendors = result
    })
}

onNoClick(): void {
  this.dialogRef.close();
}

addValue(id:any, name:any){
  this.pembanding.vendor_id = id
  this.pembanding.vendorName = name
}

onYesClick(data: DialogData): void {
  this.obj = {
    id:data.id,
    status:data.status
  }

  if (this.action=="Approve") {
    this.submissionService.setSubmissionDetailStatus(this.obj, (result:any) => {
      console.log("Success",result)
      this.dialogRef.close(1);
    })
  } else if (this.action=="Reject") {
    this.submissionService.updateRejectReason({id:this.obj.id, reject_reason:this.reason}, (result:any) => {
      console.log("Success",result)
      this.dialogRef.close(2);
    })
  }
}

addVendor(){
  this.pembanding.submission_detail_id = this.submissionId
  this.dialogRef.close(this.pembanding)
}
getPPn(event: any){
  this.numCheck(event)
  this.pembanding.ppn = 0.1*this.pembanding.price
  console.log('Pembanding PPn',this.pembanding.ppn)
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

