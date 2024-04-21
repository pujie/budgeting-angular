import { Component, OnInit, Inject } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { AuthService } from '../auth.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-submission-reject',
  templateUrl: './submission-reject.component.html',
  styleUrls: ['./submission-reject.component.css']
})
export class SubmissionRejectComponent implements OnInit {
	 logindata: any;
    submissionId;
    submission_detail = {
      submission_id: '',
      itemname: '',
      brand: '',
      partnumber: '',
      description: '',
      amount: 0,
      proposed_price:0,
      proposed_totalprice:0,
      reject_reason:'',
      purchase_reason: '',
      placement_location: '',
      vendor: '',
      vendor_id: '',
    }
    submisssion = {
      budgeting_number: "",
      createuser: "",
      id: 0,
      implementation_target: "",
      purchase_target: "",
      staff_name: "",
      subject:""
    }
    totalPrice=0;
    canApprove=false;
    discountPrice:any
    vendorName:any

  constructor(
    private submissionService: SubmissionService,
    private vendorService: VendorService,
    private router: Router,
    private auth: AuthService, 
    private location: Location,
    private activatedRoute: ActivatedRoute
    ) { 
      console.log("SUbRecJe invoked")
    this.submissionId = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.auth.isLogin((result:any) => {
    this.logindata = result
        if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
        }
      this.logindata.name.toLowerCase()
    });

    this.submissionService.getRealizationDetails(this.submissionId, (result:any) =>{
      this.submission_detail = result[0]
      console.log("Submission_detail",result[0])
      this.discountPrice = (result[0].proposed_price*result[0].amount)-result[0].proposed_totalprice
      this.vendorService.getVendor({id:result[0].vendor_id}, (result:any) => {
        this.vendorName = result.name
      })
      this.submissionService.getSubmissionById(this.submission_detail.submission_id, (results:any) =>{
        this.submisssion = results[0]
        console.log("Submission",results[0])
      });
    });
  }

  backToLastPage() {
    this.location.back();
  }

  ngOnInit() {
  }

}
