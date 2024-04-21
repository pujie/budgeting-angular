import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PaymentService } from '../payment.service';
import { SubmissionService } from '../submission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe, CurrencyPipe} from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment-update',
  templateUrl: './payment-update.component.html',
  styleUrls: ['./payment-update.component.css']
})
export class PaymentUpdateComponent implements OnInit {
	currentDate = new Date();
	payment={
		submission_detail_id:"",
		payment_date:"",
		payment_type:"",
		amount:0,
		createuser:""
	};
	detailId;
	logindata:any;

	realizationId
	submission:any
	payments:any
	sisa=0
	tempNumber:any

	constructor(
    private submissionService: SubmissionService, 
	private location: Location, 
	private paymentService:PaymentService, 
	private auth:AuthService, 
	private router:Router, 
	private activatedRoute: ActivatedRoute, 
	public datepipe: DatePipe) { 
	this.detailId = +this.activatedRoute.snapshot.paramMap.get('id')!; 
	this.realizationId = +this.activatedRoute.snapshot.paramMap.get('realizationid')!;

	this.paymentService.getPayment({id:this.detailId},(result:any) => {
	    console.log("getPayment",result)
	    this.payment = result[0];

	    this.submissionService.getSubmissionDetail(this.realizationId, (result:any) =>{
	      this.submission=result[0]
		    console.log("this.submission",this.submission)
	      
	      this.paymentService.getPaymentsBySubmissionDetailId({id:this.realizationId},(results:any) => {
	        this.payments = results;
	        for(let i=0;i<this.payments.length;i++){
	          this.sisa=this.sisa+this.payments[i].amount
	        }
	        this.sisa=this.submission.totalprice-this.sisa+this.payment.amount
	      });
	    })
	  });

	this.auth.isLogin((result:any) => {
	  console.log("login",result)
	  this.logindata = result
	  if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
	    this.router.navigate(['/login']);
	  }
      this.payment.createuser=this.logindata.name;
	});
	}

	updatePayment(obj:any){
		if(obj.payment_date != '' && obj.payment_type != '' && obj.amount != ''){
	  		this.payment.payment_date=this.datepipe.transform(obj.payment_date, 'yyyy-MM-dd') || '{}'
	  		this.payment.payment_type=obj.payment_type;
	  		this.payment.amount=obj.amount;
		  	this.paymentService.updatePayment(this.payment,(result:any) => {
		    console.log("Success",result)

			if (this.payment.amount==this.sisa) {
				this.submissionService.setSubmissionDetailStatus({id:this.realizationId, status:4}, (result:any) => {
		      		console.log("Success",result)
		    	})
			}
			this.location.back();
		  })
		}else{
		  alert("Data tidak boleh kosong!");
		  console.log("Error! data tidak lengkap")
		}
	}

	clearInput(){
		this.payment.payment_date='';
		this.payment.payment_type='';
		this.payment.amount=0;
		this.payment.createuser='';
	}

	backToLastPage() {
		this.location.back();
	}

	checkSisa(sisa:any){
		if (this.payment.amount>sisa) {
			this.payment.amount=this.tempNumber
		} else{
	    this.tempNumber=this.payment.amount
	  	}
	}

	ngOnInit() {
	}
}
