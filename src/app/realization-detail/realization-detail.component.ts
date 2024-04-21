import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { SubmissionService } from '../submission.service';
import { PaymentService } from '../payment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, CurrencyPipe } from '@angular/common';

export interface DialogData {
  id: Number;
}

@Component({
  selector: 'app-realization-detail',
  templateUrl: './realization-detail.component.html',
  styleUrls: ['./realization-detail.component.css']
})
export class RealizationDetailComponent implements OnInit {
  // displayedColumnsPayment = ['paymentdate', 'paymenttype', 'amount', 'action'];

	logindata:any;
  submissionId;
  submitter = {
    subject:'',
    staff_name:'',
    submission_date:'',
    purchase_target:'',
    implementation_target:''
  }

  submission_detail = []
  notAuthorized = true;
  paymentresult:any
  constructor(
    private submissionService: SubmissionService,
    private location: Location,
    private paymentService:PaymentService,
    private router: Router, 
    private auth: AuthService, 
    private activatedRoute: ActivatedRoute, 
    public dialog: MatDialog
    ) {
      this.submissionId = +this.activatedRoute.snapshot.paramMap.get('id')!;
 
      this.submissionService.getSubmissionById(this.submissionId, (result:any) =>{
          this.submitter = result[0];
      });
      this.auth.isLogin((result:any) => {
        this.logindata = result
          if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
            this.router.navigate(['/login']);
          }
            this.auth.isMemberOf({user_id:this.logindata.id,role_id:9},(result:any) =>{
              if(result.length>0){
                this.notAuthorized = false
              }else{
                this.notAuthorized = true
              }
            })
          })
      this.submissionService.getRealizationDetails(this.submissionId, (result:any) =>{
        this.submission_detail = result
        console.log("getRealizationDetails : submission_detail", this.submission_detail);
          this.paymentService.getPaymentBySubmissionId({id:this.submissionId},(paymentresult:any) => {
            this.paymentresult = paymentresult
          })
      });
    }

    backToLastPage() {
      this.location.back();
    }

  openDialogStaff(idnya:Number): void {
    console.log("idnya", idnya);
    const dialogRef = this.dialog.open(RealizationDetailStaffDialog, {
    width: '250px', 
    data: {id: idnya}
    });
  }

  openDialogProduct(idnya:Number): void {
    console.log("idnya", idnya);
    const dialogRef = this.dialog.open(RealizationDetailProductDialog, {
    width: '250px', 
    data: {id: idnya}
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-realization-detail',
  templateUrl: 'realization-detail-dialog.html',
})

export class RealizationDetailStaffDialog {

  obj:any;
  listOfRealization:any;
  realizationToDelete:any;

  constructor(private router:Router, private submissionService: SubmissionService, public dialogRef: MatDialogRef<RealizationDetailStaffDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
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
      status:'1'
    }
    this.submissionService.setSubmissionDetailStatusBySubmissionId({id:this.data.id,status:1},(result:any) => {
      console.log("Success set submissiondetailstatus",result)
    })
/*    for (var i = 0; i < this.listOfRealization.length; i++) {
      console.log("this.listOfRealization[i]",this.listOfRealization[i])     
      this.submissionService.setSubmissionDetailStatus({id:this.listOfRealization[i].id, status:'0'}, result => {
      console.log("Success set submissiondetailstatus",result)
      
      })
    }
*/
    this.submissionService.setSubmissionStatus(this.obj, (result:any) => {
      console.log("Success",result);
      this.router.navigate(['/realization-product']);
  })
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-realization-detail',
  templateUrl: 'realization-detail-dialog.html',
})

export class RealizationDetailProductDialog {

  obj:any;

  constructor(private router:Router, private submissionService: SubmissionService, public dialogRef: MatDialogRef<RealizationDetailProductDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(data: DialogData): void {
    this.obj = {
      id:data.id,
      status:'0'
    }

    this.submissionService.setSubmissionDetailStatus(this.obj, (result:any) => {
      console.log("Success",result)
      location.reload();
  })
    this.dialogRef.close();
  }

}
