import { Component, OnInit, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

import { PageEvent,MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SubmissionService } from '../submission.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface DialogData {
  id: Number;
}

@Component({
  selector: 'app-realization-staff',
  templateUrl: './realization-staff.component.html',
  styleUrls: ['./realization-staff.component.css']
})
export class RealizationStaffComponent implements OnInit {
    displayedColumnsStaff: string[] = ['no', 'id', 'subject', 'submission_date', 'staff_name', 'implementation_date' ,'action'];
  	
  	listOfRealization:any;
  	logindata:any

  	//Variables for paginator
    length = 100
    pageSize = 10
    pageSizeOptions : number[] = [5,10,25]
    curPageSize=10
    curIndex=0

	//Variables for search
    searchdata = ''
  	pageEvent : PageEvent = new PageEvent()

  	constructor(
  		private submissionService: SubmissionService,
  		private router: Router,
  		private icon: MatIconRegistry,
  		private sanitizer: DomSanitizer,
  		private auth: AuthService,
  		public dialog: MatDialog
  	){
  		this.submissionService.getSubmissionPage({status:2,pageSize:this.pageSize,pageIndex:0}, (result:any) =>{
	  		this.icon.addSvgIcon('search',sanitizer.bypassSecurityTrustResourceUrl('assets/round-search-24px.svg'))
	      	this.icon.addSvgIcon('usericon',sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
	      	this.listOfRealization = result
	      	this.curPageSize = this.pageSize
	      	this.curIndex = this.curIndex
	      	console.log("Obj",this.listOfRealization)
  		})

  		this.submissionService.getSubmissionCount({status:2}, (result:any) =>{
  			console.log("CNT",result)
      		this.length = result[0].cnt
  		})
      
  		this.auth.isLogin((result:any) => {
	      	console.log("login",result)
	      	this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
	        	this.router.navigate(['/login']);
	      	}
    	});
  	}

  	//functions for paginator
  	setPageSizeOptions(setPageSizeOptionsInput:string){
    	this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  	}

  	changePage($event:any){
    	console.log("Event",$event)
    	this.curIndex = $event.pageIndex
    	this.pageSize = $event.pageSize
    	this.setCurrentPage()
  	}
  	setCurrentPage(){
    	this.submissionService.getSubmissionPage({status:2,pageSize:this.pageSize,pageIndex:(this.curIndex*this.pageSize)},(result:any) => {
      		this.listOfRealization = result
    	})
  	}	

  	//functions for search submission
  	doSearch(searchData:any){
    	let searchObj = {status:2,searchData:searchData,pageSize:this.curPageSize,pageIndex:this.curIndex}
    	console.log("Data to search",searchData)
    	console.log("search object", searchObj)
    	this.submissionService.searchSubmission(searchObj, (result:any) => {
      		console.log("Search Result",result)
      		this.listOfRealization = result
    	})
    	this.submissionService.searchSubmissionCount(searchObj, (result:any) => {
      		console.log("Amount",result)
      		this.length = result[0].cnt
    	})
  	}

  	searchKeyDown(event:any,searchData:any){
    	if(event.key==='Enter'){
      		this.doSearch(searchData)
    	}
  	}

    openDialog(idnya:Number): void {
    console.log("idnya", idnya);
    const dialogRef = this.dialog.open(RealizationStaffDialog, {
    width: '250px', 
    data: {id: idnya}
    });
    }

    ngOnInit() {
    }
}

@Component({
  selector: 'app-realization-staff',
  templateUrl: 'realization-staff-dialog.html',
})

export class RealizationStaffDialog {

  obj:any;
  listOfRealization:any;
  realizationToDelete:any;

  constructor(private router:Router, private submissionService: SubmissionService, public dialogRef: MatDialogRef<RealizationStaffDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  this.submissionService.getSubmissionDetails(this.data.id, (result:any) =>{
      this.listOfRealization = result      
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(data: DialogData): void {
    this.obj = {
      id:data.id,
      status:'0'
    }

    for (var i = 0; i < this.listOfRealization.length; i++) {
      console.log("this.listOfRealization[i]",this.listOfRealization[i])     
      this.submissionService.setSubmissionDetailStatus({id:this.listOfRealization[i].id, status:'0'}, (result:any) => {
      console.log("Success",result)
      location.reload();
      })
    }

    this.submissionService.setSubmissionStatus(this.obj, (result:any) => {
      console.log("Success",result)
      location.reload();
  })
    this.dialogRef.close();
  }

}
