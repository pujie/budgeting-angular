import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SubmissionService } from '../submission.service';
import { PlafonsService } from '../plafons.service';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-padi-submissions',
  templateUrl: './padi-submissions.component.html',
  styleUrls: ['./padi-submissions.component.css']
})
export class PadiSubmissionsComponent implements OnInit {
  displayedColumns: string[] = ['no','submission_date', 'budgeting_number', 'staff', 'itemname', 'amount', 'totalprice', 'placement_location', 'stat','action'];
  logindata:any;
  listOfDetails:any;
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

  listOfPlafons:any
  plafons = true;

  todayDate = new Date()
  todayMonth:any
  todayYear:any

  plafonsCity="Surabaya"
  plafonsSales:any
  plafonsTeknik:any
  plafonsKeuangan:any
  plafonsUmum:any
  plafonsTotal={current_budget:0, budget_limit:0}
  quarter:any

  months = [
    {value: 1, viewValue: "January"},
    {value: 2, viewValue: "February"},
    {value: 3, viewValue: "March"},
    {value: 4, viewValue: "April"},
    {value: 5, viewValue: "May"},
    {value: 6, viewValue: "June"},
    {value: 7, viewValue: "July"},
    {value: 8, viewValue: "August"},
    {value: 9, viewValue: "September"},
    {value: 10, viewValue: "October"},
    {value: 11, viewValue: "November"},
    {value: 12, viewValue: "December"}
  ]

  divisions = [
    {value: 1, viewValue: 'Sales & Marketing'},
    {value: 2, viewValue: 'Technical'},
    {value: 3, viewValue: 'Finance'},
    {value: 4, viewValue: 'General'}
  ]

  statuses = [
    {value: 1, viewValue: "Pending"},
    {value: 6, viewValue: "Pre-Approval"},
    {value: 2, viewValue: "Approved and not bought"},
    {value: 5, viewValue: "Approved, bought and termin"},
    {value: 4, viewValue: "Approved, bought and paid"},
    {value: 3, viewValue: "Rejected"}
    
  ]

  detailsToDisplay:any
    dataSource:any;

  //Variables for paginator
    length = 100
    pageSize = 10
    pageSizeOptions : number[] = [5,10,25]
    curPageSize=10
    curIndex=0
    submissionStatus = '0'
    submissionDivision = '0'
    submissionBranch = '0'
  constructor(
    private submissionService: SubmissionService,
    private plafonsService: PlafonsService,
    private userService: UserService,
    private auth:AuthService, 
    private router: Router,
    private icon: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public datePipe: DatePipe,
    public dialog: MatDialog
  ) {
  	this.auth.isLogin((result:any) => {
      this.logindata = result
      console.log("this.logindata", this.logindata)
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
      this.auth.isMemberOf({user_id:this.logindata.id,role_id:this.userService.role.plafoncreator}, (result:any) => {
        if(result.length>0){
          this.plafons = false
        }else{
          this.plafons = true
        }
      })
      this.icon.addSvgIcon('usericon',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
    });

    //this._filter(0, 0)
    this.filterCity(0, 4)

  }

  filterCity(x:any, y:any){
    this._filter(x, y)
    
    if (x==0) {
      this.plafonsCity="Surabaya"
    } else if (x==1) {
      this.plafonsCity="Jakarta"
    } else if (x==2) {
      this.plafonsCity="Bali"
    } else if (x==3) {
      this.plafonsCity="Malang"
    }

    this.plafonsSales=new Array()
    this.plafonsTeknik=new Array()
    this.plafonsKeuangan=new Array()
    this.plafonsUmum=new Array()
    this.plafonsTotal.current_budget=0
    this.plafonsTotal.budget_limit=0
    
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

    this.plafonsService.getPlafons((result:any) => {
      this.listOfPlafons = result


      for (var i = 0; i < this.listOfPlafons.length; i++) {
        if (this.listOfPlafons[i].city==this.plafonsCity) {
          if (this.listOfPlafons[i].year==this.todayYear) {
            if (this.listOfPlafons[i].quarter==this.quarter) {
              if (this.listOfPlafons[i].division==1) {
                this.plafonsSales=this.listOfPlafons[i]
                this.plafonsTotal.current_budget=this.plafonsTotal.current_budget+this.listOfPlafons[i].current_budget
                this.plafonsTotal.budget_limit=this.plafonsTotal.budget_limit+this.listOfPlafons[i].budget_limit
              } else if (this.listOfPlafons[i].division==2) {
                this.plafonsTeknik=this.listOfPlafons[i]
                this.plafonsTotal.current_budget=this.plafonsTotal.current_budget+this.listOfPlafons[i].current_budget
                this.plafonsTotal.budget_limit=this.plafonsTotal.budget_limit+this.listOfPlafons[i].budget_limit
              } else if (this.listOfPlafons[i].division==3) {
                this.plafonsKeuangan=this.listOfPlafons[i]
                this.plafonsTotal.current_budget=this.plafonsTotal.current_budget+this.listOfPlafons[i].current_budget
                this.plafonsTotal.budget_limit=this.plafonsTotal.budget_limit+this.listOfPlafons[i].budget_limit
              } else if (this.listOfPlafons[i].division==4) {
                this.plafonsUmum=this.listOfPlafons[i]
                this.plafonsTotal.current_budget=this.plafonsTotal.current_budget+this.listOfPlafons[i].current_budget
                this.plafonsTotal.budget_limit=this.plafonsTotal.budget_limit+this.listOfPlafons[i].budget_limit
              }
            } 
          }
        }
      }
    })
    this.getAllSubmissions((allsubmissions:any) => {
      this.filterUser(allsubmissions,(detailByUser:any) => {
        console.log('detailByUser',detailByUser)
        this.detailsToDisplay = detailByUser
      })})
  }

  ngOnInit() {
  }
  filterUser(allsubmissions:any,callback:any){
    var tempArr = new Array()
    this.auth.isMemberOf({role_id:this.userService.role.submissionviewer,user_id:this.logindata.id}, (result:any) => {
      if(result.length>0){
        callback(allsubmissions)
      }else{
        callback(allsubmissions.filter((obj:any)=>{
          return ((obj.createuser = this.logindata.name))
        }))
        console.log("this.filteredDetails", this.filteredDetails)
      }
    })
  }
  showSelectedStatus(){
    this.getAllSubmissions((result:any) => {
      this.filterUser(result,(detailByUser:any) => {
        console.log('selected status user',detailByUser)
        this.filterSubmissionStatus(detailByUser,(submissionStatus:any)=>{
          this.filterSubmissionDivision(submissionStatus,(submissionDivision:any)=>{
            this.filterSubmissionBranch(submissionDivision,(submissionBranch:any) => {
              this.detailsToDisplay = submissionBranch
            })
          })
        })
      })
    })
  }
  filterSubmissionStatus(objs:any,callback:any){
    console.log('This SUbmission Status',this.submissionStatus)
    if(String(this.submissionStatus)==='0'){
      callback(objs)
    }else
    {
      callback(objs.filter((arr:any)=>{
        return (arr.detailstatus === String(this.submissionStatus))
      }))
    }  
  }
  filterSubmissionDivision(objs:any,callback:any){
    console.log('This Submission Division',this.submissionDivision)
    if(String(this.submissionDivision)==='0'){
      callback(objs)
    }else
    {
      callback(objs.filter((arr:any)=>{
        return (arr.division_id === String(this.submissionDivision))
      }))
    }  
  }
  filterSubmissionBranch(objs:any,callback:any){
    console.log('This Submission Branch',this.submissionBranch)
    if(String(this.submissionBranch)==='0'){
      callback(objs)
    }else
    {
      callback(objs.filter((arr:any)=>{
        return (arr.placement_location === String(this.submissionBranch))
      }))
    }  
  }
  isexist(arr:any,term:any){
    if(arr.indexOf(term)===-1){
      return false
    }
    return true
  }
  filterSubmissionArea(objs:any,submissionArea:any,callback:any){
    if(submissionArea=='0'){
      callback(objs)
    }else
    {
      callback(objs.filter((arr:any)=>{
        return (arr.status === String(submissionArea))
      }))
    }  
  }
  _filter(status:any, type:any){
    this.getAllSubmissions((allsubmissions:any) => {
      this.filterUser(allsubmissions,(result:any) => {
        this.filterSubmissionStatus(result,(areaUser:any)=>{
          this.detailsToDisplay = areaUser
        })
      })
    })
  }
  filter(status:any, type:any){
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
      this.auth.isMemberOf({role_id:this.userService.role.showbranchfilter,user_id:this.logindata.id}, (result:any) => {
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
    this.userService.getUsersByDivisionId(this.currentDivision, (result:any) => {
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
    this.getAllSubmissions((allsubmissions:any) => {
      this.filterUser(allsubmissions,(detailByUser:any) => {
        this.detailsToDisplay = detailByUser.filter((rows:any)=>{
          return rows.submission_date >= this.datePipe.transform(new this.filterDate.minimum, 'yyyy-MM-dd')! 
          && 
          rows.submission_date <= this.datePipe.transform(new this.filterDate.maximum, 'yyyy-MM-dd')!
        })
      })
    })
  }
  getAllSubmissions(callback:any){
    var indexArr = 1
    var array=new Array()
      this.submissionService.getPadiSubmissions((result:any) => {
        callback(result)
        console.log("Result",result)
      })
  }

  //functions for paginator
    setPageSizeOptions(setPageSizeOptionsInput:string){
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
    }

    changePage($event:any){

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

  detail(status:any, id:any){
    console.log("DEtail",status,id)
    if (status=="Pending") {
      this.router.navigate(['/padi-submission-detail/'+id+'/1']);
    }else if (status=="Approved only" || status=="Approved, bought and paid" || status=="Approved, bought and termin") {
      this.router.navigate(['/realization-detail/'+id]);
    }else if (status=="Rejected") {
      this.router.navigate(['/submissions-reject-detail/'+id]);
    }else if(status =="Pre-Approval"){
      this.router.navigate(['/submissions-detail-detail/'+id]);
    }
  }

  goTo(status:any, id:any, submissionId:any){
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
}
