import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSelectModule, 
          MAT_DIALOG_DATA, MatIconRegistry, MAT_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'        
import { PageEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { SubmissionService } from '../submission.service';
import { UserService } from '../user.service';
import { CommonService } from '../common.service';
import { RoleService } from '../role.service';
import { MailService } from '../mail.service';
import { MailTemplateService } from '../mail-template.service';
import { BudgetService } from '../budget.service';
import { CommonConfirmerComponent } from '../common-confirmer/common-confirmer.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { SubmissionsDetailDetailComponent } from '../submissions-detail-detail/submissions-detail-detail.component';
import { SubmissionInfoComponent } from '../submission-info/submission-info.component';
import { ViewPOComponent } from '../view-po/view-po.component';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  displayedColumns: string[] = ['no','submission_date', 'budgeting_number', 'staff', 'itemname', 'amount', 'totalprice', 'placement_location', 'stat','action'];
  logindata;
  listOfDetails;
  filteredDetails= new Array()
  filterDate = {
    minimum: Date,
    maximum: Date
  }

  currentDate = new Date()
  currentStatus = 0;
  currentMonth = "0";
  currentDivision = 0;
  currentCity = "0";


  todayDate = new Date()
  todayMonth
  todayYear

  quarter

  statuses
  divisions
  division_id = 0
  detailsOrigin
  detailsToDisplay
  dataSource;
  toDate
  tillDate
//Variables for paginator
  length = 100
  pageSize = 10
  pageSizeOptions : number[] = [5,10,25]
  curPageSize=10
  curIndex=0
  submissionStatus = '0'
  submissionDivision = '0'
  submissionBranch = '0'
  userRoles
  dtminimum
  dtmaximum
  _roles = {
    submitter:1,
    approval1:2,
    approval2:3,
    approval3:4,
    approval4:5,
    purchase:6,
    admin:7,
    plafoncreator:8,
    realizationauth:9,
    submissionviewer:10,
    showbranchfilter:11,
    nego:12,
    warehouse:13,
    verifier:14}
    isverifier=false
    isapprover1=false
    isapprover2=false
    isapprover3=false
    isapprover4=false
    constructor(
    private submissionService: SubmissionService,
    private userService: UserService,
    private auth:AuthService, 
    private router: Router,
    private icon: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public datePipe: DatePipe,
    public dialog: MatDialog,
    private commonService: CommonService,
    private roleService: RoleService,
    private mailService: MailService,
    private mailTemplateService: MailTemplateService,
    private commonConfirmer: MatDialog,
    private crud: CrudService
  ) {
    this.roleService.getRoleMails({identifier:'verifier'},role=>{
      console.log("Role",role)
      this.commonService.extractMail(role,mailArray=>{
        console.log("Mail Array",mailArray)
        mailArray+=',iwan@padi.net.id'
        console.log("Mail Array2",mailArray)
      })
    })

    this.divisions = this.commonService.divisions
    this.statuses = this.commonService.statuses
  	this.auth.isLogin(result => {
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
      this.icon.addSvgIcon('usericon',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))

      this.userService.getRoles({user_id:this.logindata.id},roles => {
        console.log("User Roles",roles)
        this.userRoles = roles.map(role=>{
          return role.role_id
        }).join(",")
        this.submissionService.getSubmissionByRole({params:this.userRoles,user_id:this.logindata.id},allSubmissions=>{
          console.log("RESULT GET SUBMISSI BY ROLE",allSubmissions)
          this.detailsOrigin = allSubmissions
          this.detailsToDisplay = allSubmissions
          this.resetDate(()=>{
            this.showSelectedStatus()
          })
        })
      })
      console.log("This date",this.filterDate)
      /*this.auth.isMemberOfClass({user_id:this.logindata.id,rclass:'viewPO'},res=>{
        console.log("Is Member Of Class",res)
        if(res.length>0){
          this.isverifier = true;
        }
      })*/
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:14},res=>{
        console.log("Is Member Of Class",res)
        if(res.length>0){
          this.isverifier = true;
        }
      })
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:2},res=>{
        console.log("Is Member Of Class",res)
        if(res.length>0){
          this.isapprover1 = true;
        }
      })
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:3},res=>{
        console.log("Is Member Of Class",res)
        if(res.length>0){
          this.isapprover2 = true;
        }
      })
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:4},res=>{
        console.log("Is Member Of Class",res)
        if(res.length>0){
          this.isapprover3 = true;
        }
      })
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:5},res=>{
        console.log("Is Member Of Class",res)
        if(res.length>0){
          this.isapprover4 = true;
        }
      })
    });
    this.filterCity(0, 4)
  }
  submission_owner = function(user_id){
    if(user_id===this.logindata.id){
      return true;
    }else{
      return false;
    }
  }
  approver = function(){
    return false;
  }
  verifier = function(){
    if(this.isverifier){
      return true;
    }else{
      return false;
    }
  }
  verifiedrejectable(obj){
    if((this.isverifier)&&(obj.stat == "Verified")){
      return true;
    }else{
      return false;
    }
  }
  showPO(submissionId){
    const cc = this.commonConfirmer.open(ViewPOComponent,{
      data:{submissionId:submissionId},
      width:'720px'
    })
    cc.afterClosed().subscribe(res=>{
      console.log('afterClosed',res)
    })
  }
  editSubmission(submissionid){
    this.auth.isMemberOfDivision({user_id:this.logindata.id,division_id:1},res => {
      if(res[0].cnt>0){
        console.log("IS SALES TEAM MEMBER ......")
        this.router.navigate(['/salessubmissionedit/'+submissionid])
      }else{
        console.log("IS NOT SALES TEAM MEMBER ......")
        this.router.navigate(['/submission-edit/'+submissionid])
      }
    })

    this.router.navigate(['/submission-edit/'+submissionid])
  }
  removeSubmission(obj){
    console.log("remove param",obj)
    const confirmer = this.dialog.open(CommonConfirmerComponent,{
      data:{
        alertText:"Benar-benar akan menghapus " + obj.budgeting_number + " ?"
      }
    })
    confirmer.afterClosed().subscribe(result=>{
      console.log("After Close",result)
      switch(result.answer){
        case 'yes':
          this.crud.doGet({
            url:'/movetotrash/submission_details/'+obj.id
          },removedsubmissiondetail=>{
            this.crud.doGet({
              url:'/movetotrash/submissions/'+obj.submission_id
            },removedSubmission=>{
              console.log("Success remove",obj)
              this.reloadData()
            })
          })
        console.log("U process ur request")
          break
        case 'cancel':
          console.log("U cancel ur request")
          break
      }
    })
  }
  getMonth(){
    let x = new Date().getMonth()
    console.log("Boelan",x)
    if (x>2){
      return x-3;
    }else{
      return x+9;
    }
  }
  getYear(){
    let x = new Date().getMonth()
    let y = new Date().getFullYear()
    if (x>=2){
      return y-1;
    }else{
      return y;
    }
  }
  resetDate(callback){
    this.toDate = new Date();
    this.filterDate.maximum = this.toDate
    let month = this.getMonth()
    let year = this.getYear()
    //this.tillDate = new Date(new Date().getFullYear(), 0, 1);
    //this.tillDate = new Date(year, month, 1);
    this.tillDate = new Date(2021,month,1)
    this.filterDate.minimum = this.tillDate
    console.log("TILL Date",this.tillDate)
    callback()
  }
  entryFixedPrice(submissionDetailId, submissionId){
    console.log("Entry Fixed Price Invoked")
  }
  filterCity(x, y){
    this.filter(x, y)
    
    this.todayMonth=this.datePipe.transform(this.todayDate, 'MM')
    this.todayYear=this.datePipe.transform(this.todayDate, 'yyyy')

    if (this.todayMonth>=1&&this.todayMonth<=3) {
      this.quarter=1
    } else if (this.todayMonth>=4&&this.todayMonth<=6) {
      this.quarter=2
    } else if (this.todayMonth>=7&&this.todayMonth<=9) {
      this.quarter=3
    } else {
      this.quarter=4
    }
  }
  ngOnInit() {
  }
  filterUser(allsubmissions,callback){
  }
  showSelectedStatus(){
    console.log("SubmissionStatus",this.submissionStatus)
    console.log("Division",this.division_id)
    console.log("SubmissionBranch",this.submissionBranch)
    console.log("Date Minimum",this.datePipe.transform(this.filterDate.minimum, 'yyyy-MM-dd') )
    console.log("Date Maximum",this.datePipe.transform(this.filterDate.maximum, 'yyyy-MM-dd') )
    this.detailsToDisplay = this.detailsOrigin.filter(rows=>{
      return rows.submission_date >= this.datePipe.transform(this.filterDate.minimum, 'yyyy-MM-dd') 
      && 
      rows.submission_date <= this.datePipe.transform(this.filterDate.maximum, 'yyyy-MM-dd')
      && 
      ((rows.detailstatus == this.submissionStatus)||(this.submissionStatus == '0'))
      && 
      ((rows.division_id == this.division_id)||(this.division_id==0))
      &&
      ((rows.city_id == this.submissionBranch)||(this.submissionBranch=='0'))
  })
  }
  filterSubmissionStatus(objs,callback){
    console.log('This SUbmission Status',this.submissionStatus)
    if(String(this.submissionStatus)==='0'){
      callback(objs)
    }else
    {
      callback(objs.filter(arr=>{
        return (arr.detailstatus === String(this.submissionStatus))
      }))
    }  
  }
  filterSubmissionDivision(objs,callback){
    console.log('This Submission Division',this.submissionDivision)
    if(String(this.submissionDivision)==='0'){
      callback(objs)
    }else
    {
      callback(objs.filter(arr=>{
        return (arr.division_id === String(this.submissionDivision))
      }))
    }  
  }
  filterSubmissionBranch(objs,callback){
    console.log('This Submission Branch',this.submissionBranch)
    if(String(this.submissionBranch)==='0'){
      callback(objs)
    }else
    {
      callback(objs.filter(arr=>{
        return (arr.placement_location === String(this.submissionBranch))
      }))
    }  
  }
  isexist(arr,term){
    if(arr.indexOf(term)===-1){
      return false
    }
    return true
  }
  filterSubmissionArea(objs,submissionArea,callback){
    if(submissionArea=='0'){
      callback(objs)
    }else
    {
      callback(objs.filter(arr=>{
        return (arr.status === String(submissionArea))
      }))
    }  
  }
  ll(status, type){
    this.getAllSubmissions(allsubmissions => {
      this.filterUser(allsubmissions,result => {
        this.filterSubmissionStatus(result,areaUser=>{
          this.detailsToDisplay = areaUser
        })
      })
    })
  }
  filter(status, type){
    if(type == 1){//filter by status
      this.currentStatus = status
    }else if(type == 2){//filter by month
      this.currentMonth = status
    }else if(type == 3){//filter by division
      this.currentDivision = status
    }else if(type == 4){//filter by city
      if (status==0) {
        this.currentCity="Surabaya"
      } else if (status==1) {
        this.currentCity="Jakarta"
      } else if (status==2) {
        this.currentCity="Bali"
      } else if (status==3) {
        this.currentCity="Malang"
      }
    }else if(type == 5){
      this.getFilteredDate()
    }

    if(this.currentCity != "0"){
      this.getCity()
    }
    if(this.currentStatus != 0){
      this.getStatus()
    }
    if(this.currentMonth != "0"){
      this.getMonths()
    }
    if(this.currentDivision != 0){
      this.getDivisions()
    }else{
      this.listOfDetails = this.filteredDetails
      this.length=this.listOfDetails.length
      this.setCurrentPage()
    }
  }

  getCity(){
    var ind
    var array = new Array();
    for(let index in this.filteredDetails){
      ind = parseInt(index)
      this.auth.isMemberOf({role_id:this.userService.role.showbranchfilter,user_id:this.logindata.id}, result => {
        if(result.length>0){
          if(this.filteredDetails[index].placement_location == this.currentCity){
            array.push(this.filteredDetails[index])
          }
        }else{
          array.push(this.filteredDetails[index])
        }
      })
    }
    this.filteredDetails = array
  }

  getStatus(){
    var ind
    var stat
    var array = new Array();
    for(let index in this.filteredDetails){
      ind = parseInt(index)
      stat = parseInt(this.filteredDetails[ind].status)
      if(stat == this.currentStatus){
        array.push(this.filteredDetails[index])
      }
    }
    this.filteredDetails = array
  }

  getMonths(){
    var ind
    var array = new Array();
    for(let index in this.filteredDetails){
      ind = parseInt(index)
      if(this.filteredDetails[index].month == this.currentMonth){
        array.push(this.filteredDetails[index])
      }
    }
    this.filteredDetails = array
  }

  getDivisions(){
    var ind
    var array = new Array()
    this.userService.getUsersByDivisionId(this.currentDivision, result => {
      for(let user of result){
        for(let detail of this.filteredDetails){
          if(detail.createuser == user.username){
            array.push(detail)
          }
        }
      }
      this.filteredDetails = array
      this.listOfDetails = this.filteredDetails
      this.length=this.listOfDetails.length
      this.setCurrentPage()

    })
  }
  getFilteredDate(){
    this.detailsToDisplay = this.detailsOrigin.filter(rows=>{
      return rows.submission_date >= this.datePipe.transform(this.filterDate.minimum, 'yyyy-MM-dd') 
      && 
      rows.submission_date <= this.datePipe.transform(this.filterDate.maximum, 'yyyy-MM-dd')
    })
  }
  getAllSubmissions(callback){
    var indexArr = 1
    var array=new Array()
      this.submissionService.getSubmissions(result => {
        callback(result)
        console.log("Result",result)
      })
  }

  //functions for paginator
    setPageSizeOptions(setPageSizeOptionsInput:string){
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
    }

    changePage($event){

      this.curIndex = $event.pageIndex
      this.pageSize = $event.pageSize
      this.length = $event.length
      this.setCurrentPage()
    }
    setCurrentPage(){
      this.detailsToDisplay=new Array();

      if (this.listOfDetails.length>=(this.curIndex+1)*this.pageSize) {
        for (var i = this.curIndex*this.pageSize; i < (this.curIndex+1)*this.pageSize; i++) {
          this.detailsToDisplay.push(this.listOfDetails[i]);
        }
      }else{
        for (var i = this.curIndex*this.pageSize; i < this.listOfDetails.length; i++) {
          this.detailsToDisplay.push(this.listOfDetails[i]);
        }
      }
      this.dataSource = new MatTableDataSource(this.detailsToDisplay)
    } 

  printSummary(){
    window.print()
  }
  editVerification(submissionId){
    this.userService.checkRole({user_id:this.logindata.id,role_id:this._roles.verifier},res => {
      if(res.yes){
        this.router.navigate(['/verification/'+submissionId]);
      }
    })
  }
  detail(status, id, submissionId){
    console.log("Detail",status,submissionId)
    console.log("login Data",this.logindata)
    console.log("Status",status)
    switch(status){
      case 'Pending':
          this.userService.checkRole({user_id:this.logindata.id,role_id:this._roles.verifier},res => {
            if(res.yes){
              this.router.navigate(['/verification/'+submissionId]);
            }
          })
          this.userService.checkRole({user_id:this.logindata.id,role_id:this._roles.submitter},res => {
            if(res.yes){
              this.router.navigate(['/submission-detail/'+submissionId+'/1']);
            }
          })
      break
      case 'Verified':
          this.router.navigate(['/submission-detail/'+submissionId+'/1']);
      break
      case 'Approved only':
          this.router.navigate(['/finalPrice/'+submissionId]);
      break
      case 'Rejected':
          this.router.navigate(['/submissions-reject-detail/'+submissionId]);
      break
      case 'Pre-Approval':
          this.router.navigate(['/submissions-detail-detail/'+submissionId]);
      break
      case 'Approved, bought and paid':
        this.userService.checkRole({user_id:this.logindata.id,role_id:this._roles.warehouse},res => {
          if(res.yes){
            this.router.navigate(['/goodReceived/'+submissionId])
          }
        })
        this.userService.checkRole({user_id:this.logindata.id,role_id:this._roles.purchase},res => {
          if(res.yes){
            this.router.navigate(['/realization-detail/'+submissionId])
          }
        })
//          this.router.navigate(['/goodReceived/'+submissionId]);
      break
      case "Approved, bought and termin":
        this.userService.checkRole({user_id:this.logindata.id,role_id:this._roles.warehouse},res => {
          if(res.yes){
            this.router.navigate(['/goodReceived/'+submissionId])
          }
        })
        this.userService.checkRole({user_id:this.logindata.id,role_id:this._roles.purchase},res => {
          if(res.yes){
            this.router.navigate(['/realization-detail/'+submissionId])
          }
        })
//        this.router.navigate(['/goodReceived/'+submissionId])
      break
      case "Deal Price":
        this.router.navigate(['/realization-detail/'+submissionId])
      break
      case 'sent':
          this.router.navigate(['/goodReceived/'+submissionId]);
      break
      case 'verification':
        this.router.navigate(['/verification/'+submissionId]);
      break
      case 'Received':
        console.log('PadiNET Receive')
        this.submissionService.getSubmissionDetailBySubmissionId(submissionId,res=>{
          console.log("submissionDetail",res)
            const cc = this.commonConfirmer.open(SubmissionInfoComponent,{
            data:{submissionId:submissionId},
            width:'600px'
        })

        })
      break
    }
console.log("DEtail",status,id,submissionId)
    /*if (status=="Pending") {
      this.router.navigate(['/submission-detail/'+id+'/1']);
    }else if (status=="Approved only" || status=="Approved, bought and paid" || status=="Approved, bought and termin") {
      this.router.navigate(['/realization-detail/'+submissionId]);
    }else if (status=="Rejected") {
      this.router.navigate(['/submissions-reject-detail/'+id]);
    }else if(status =="Pre-Approval"){
      this.router.navigate(['/submissions-detail-detail/'+id]);
    }*/
  }
  approve(id){
    window.location.href = '/approval/'+id
  }
  goTo(status, id, submissionId){
    if (status=="Pending") {
      this.router.navigate(['/submission-detail/'+submissionId]);
    }else if (status=="Approved only" || status=="Approved, bought and paid" || status=="Approved, bought and termin") {
      this.router.navigate(['/realization-detail/'+submissionId]);
    }else if (status=="Rejected") {
      this.router.navigate(['/submissions-reject-detail/'+id]);
    }else if(status =="Pre-Approval"){
      this.router.navigate(['/submissions-detail-detail/'+id]);
    }
  }
  reSendSubmissionMail(submission_id){
    this.submissionService.getSubmissionById(submission_id,submissions=>{
      let submission = submissions[0]
      console.log("Submission",submission)
      this.roleService.getRoleMail({identifier:'purchase'},res=>{
        this.mailService.postMail({
          recipient:res[0].email,
          msg:this.mailTemplateService.submissionCreateNotification(
            {
              creator:submission.createuser,
              itemName:submission.itemname,
              submissionId:submission.id
            }),
          subject:'Resend Mail Purchase Submission ('+submission.itemname+', '+submission.createuser+')'
        },
        mail=>{
          //window.location.href = "/landing"
        })
  
      })  
    })
  }
  getMenuClass(stat){
    //console.log("STAT",stat)
    if(stat !== 'Pending'){
      return 'hidden'
    }else{
      return 'mat-option mat-active'
    }
  }
  rejectByVerifier(submission){
    const confirmer = this.dialog.open(CommonConfirmerComponent,{
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
  rejectVerified(obj,callback){
    this.crud.doGet({url:'/moverejectdetail/'+obj.submission_id},res=>{
      console.log('reject verified res',res)
      callback(res)
    })
  }
  reloadData(){
    this.userService.getRoles({user_id:this.logindata.id},roles => {
      console.log("User Roles",roles)
      this.userRoles = roles.map(role=>{
        return role.role_id
      }).join(",")
      this.submissionService.getSubmissionByRole({params:this.userRoles,user_id:this.logindata.id},allSubmissions=>{
        console.log("RESULT GET SUBMISSI BY ROLE",allSubmissions)
        this.detailsOrigin = allSubmissions
        this.detailsToDisplay = allSubmissions
        this.resetDate(()=>{
          this.showSelectedStatus()
        })
      })
    })

  }
}
