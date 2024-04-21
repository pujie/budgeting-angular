import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SubmissionService } from '../submission.service';
import { PurchasehistoryService } from '../purchasehistory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { PlafonsService } from '../plafons.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-realization-update',
  templateUrl: './realization-update.component.html',
  styleUrls: ['./realization-update.component.css']
})
export class RealizationUpdateComponent implements OnInit {
	currentDate = new Date();
	logindata:any;
	submissionId;
	detailId;
	listOfRealization:any;
	realizationToUpdate={
		amount:0,brand:'',createuser:'',createdate:'',description:'',discountlevel:'',guarantee:'',id:0,information:'',
	    itemname:'',note:'',partnumber:'',placement_location:'',price:0,product_id:0,proposed_price:0,proposed_totalprice:0,
	    proposed_vendor:'',purchase_date:'',purchase_reason:'',status:'',submission_id:0,totalprice:0,vendor:'',vendor_id:0,
	    ppn:0, ongkir:0
	}

	submitter={
		budgeting_number: '',
		createuser: '',
		id: 0,
		implementation_target: '',
		purchase_target: '',
		staff_name: '',
		subject: '',
		submission_date:''
	};

	plafon = {
	    division:0,
	    city:'',
	    year:'',
	    quarter:0,
	    budget_limit:0,
	    current_budget:0,
	    id:0
	}

	history = {
	  submission_detail_id:'',
	  product_name:'',
	  vendor_name:'',
	  submission_date:'',
	  implementation_target:'',
	  createuser:''
	}
	histories:any;

	month:any
    year:any
    quarter:any
    division:any

    listOfPlafons:any
    currentBudget:any

  constructor(
  	private purchasehistoryservice: PurchasehistoryService, 
  	private submissionService: SubmissionService,	
  	private router: Router,	private auth: AuthService, 
    private plafonsService: PlafonsService,
  	private activatedRoute: ActivatedRoute,
    private userService: UserService, 
    private datePipe: DatePipe ) {
  	this.submissionId = +this.activatedRoute.snapshot.paramMap.get('submissionId')!; 
  	this.detailId = +this.activatedRoute.snapshot.paramMap.get('detailId')!; 

	this.auth.isLogin((result:any) => {
	    this.logindata = result
	    if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
	      this.router.navigate(['/login']);
	    }
	  });

	this.submissionService.getSubmissionDetails(this.submissionId, (result:any) =>{
	  	this.listOfRealization = result
	  	console.log("Objct",this.listOfRealization)

	  	for (var i = 0; i < this.listOfRealization.length; i++) {
			if (this.listOfRealization[i].id==this.detailId) {
				this.realizationToUpdate=this.listOfRealization[i];
	  			console.log("realizationToUpdate",this.realizationToUpdate)
			}
		}

		this.calculateTotalPrice(this.realizationToUpdate.price, this.realizationToUpdate.ppn, this.realizationToUpdate.ongkir)
	});

	this.submissionService.getSubmissionById(this.submissionId, (result:any) =>{
	  	this.submitter = result[0];
	  	console.log("Submitter",this.submitter);
	  	this.getPlafond()
	});
  }

	checkNumber(num:any, code:any){
		if (num<0 || num==undefined) {
			if (code==1) {
				this.realizationToUpdate.price=0
			} else if (code==2) {
				this.realizationToUpdate.ppn=0
			} else if (code==3) {
				this.realizationToUpdate.ongkir=0
			}
		}
	}

  	updateRealization(obj:any){
	  	obj.purchase_date=this.datePipe.transform(obj.purchase_date, 'yyyy-MM-dd') 
	  	obj.purchase_target=this.datePipe.transform(obj.purchase_target, 'yyyy-MM-dd') 
	    console.log("obj",obj)  

		this.currentBudget=this.currentBudget+this.realizationToUpdate.totalprice
		this.plafon.current_budget=this.currentBudget
		console.log("this.plafon.current_budget",this.plafon.current_budget)

		this.updatePurchaseHistory(obj)  
	    
		this.submissionService.updatesubmissiondetail(obj, (result:any) => {
	      console.log("Success",result)    
	    	this.router.navigate(['/realization-detail/'+this.realizationToUpdate.submission_id]);
   		})

		this.plafonsService.updatePlafon(this.plafon, (result:any) => {
	      console.log("Success",result)    				
		})

		this.submissionService.setSubmissionDetailStatus({id:this.realizationToUpdate.id, status:5}, (result:any) => {
      		console.log("Success",result)
    	})

  	}

	updatePurchaseHistory(obj:any){
		this.history.submission_detail_id=obj.id
	  	this.history.product_name=obj.itemname
	  	this.history.vendor_name=obj.vendor
	  	this.history.submission_date=this.datePipe.transform(this.submitter.submission_date, 'yyyy-MM-dd') || '{}'
	  	this.history.implementation_target=this.datePipe.transform(this.submitter.implementation_target, 'yyyy-MM-dd') || '{}'
	  	this.history.createuser=obj.createuser

		this.purchasehistoryservice.getPurchaseHistory({submission_detail_id:obj.id}, (result:any) => {
			console.log("Success",result.length)  
			if (result.length==0) {
				this.purchasehistoryservice.savePurchaseHistory(this.history, (results:any) => {
		    		console.log("Success",results)  
		    	})
			}else{
				this.purchasehistoryservice.updatePurchaseHistory(this.history, (results:any) => {
		    		console.log("Success",results)  
		    	})
			}
    	})
	}

  	getPlafond(){
      this.month=this.datePipe.transform(this.submitter.purchase_target, 'MM')
      this.year=this.datePipe.transform(this.submitter.purchase_target, 'yyyy')

      if (this.month>=1&&this.month<=3) {
        this.quarter=1
      } else if (this.month>=4&&this.month<=6) {
        this.quarter=2
      } else if (this.month>=7&&this.month<=9) {
        this.quarter=3
      } else {
        this.quarter=4
      }

      this.userService.getuserByName(this.submitter.createuser, (result:any) =>{
      	console.log("user",result)
        this.userService.getDivisionsByUserId(result[0].id, (results:any) =>{
        console.log("division",results)
          if (results[0].division=="Sales") {
            this.division=1
          } else if (results[0].division=="Teknis") {
            this.division=2
          } else if (results[0].division=="Keuangan") {
            this.division=3
          } else if (results[0].division=="Umum") {
            this.division=4
          }

          this.plafonsService.getPlafons((resultss:any) => {
            this.listOfPlafons = resultss
			console.log("this.listOfPlafons",this.listOfPlafons)
			console.log("this.placement_location",this.realizationToUpdate.placement_location)
			console.log("this.year",this.year)
			console.log("this.quarter",this.quarter)
			console.log("this.division",this.division)
            for (var i = 0; i < this.listOfPlafons.length; i++) {
              if (this.listOfPlafons[i].city==this.realizationToUpdate.placement_location) {
                if (this.listOfPlafons[i].year==this.year) {
                  if (this.listOfPlafons[i].quarter==this.quarter) {
                    if (this.listOfPlafons[i].division==this.division) {
                    	this.plafon=this.listOfPlafons[i]
      					this.currentBudget=this.plafon.current_budget-this.realizationToUpdate.totalprice
						console.log("this.currentBudget",this.currentBudget)
                    }
                  } 
                }
              }
            }
          })
        })
      });
    }

  	calculateTotalPrice(price:any, ppn:any, ongkir:any){
  		this.realizationToUpdate.totalprice=(this.realizationToUpdate.amount*price)+ppn+ongkir
  	}
  ngOnInit() {
  }

}
