import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { ProductvendorService } from '../productvendor.service';
import { NativeDateAdapter, MatDateFormats, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core'
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonConfirmerComponent } from '../common-confirmer/common-confirmer.component';


const MY_DATE_FORMATS:MatDateFormats = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'inputs',
    monthYearLabel: 'MM YY',
    dateA11yLabel: 'DD.MM.YY',
    monthYearA11yLabel: 'MM YY'}
};

export class PadiDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (displayFormat == "inputs") {
      console.log("A",this._to2digit(day) + '/' + this._to2digit(month) + '/' + year)
      return year + '-' + this._to2digit(month)+'-'+this._to2digit(day);
    }
    return year + '/' + this._to2digit(month)+'/'+this._to2digit(day);
  }
  private _to2digit(n: number) {
      return ('00' + n).slice(-2);
  } 
}

@Component({
  selector: 'app-submission-edit',
  templateUrl: './submission-edit.component.html',
  styleUrls: ['./submission-edit.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PadiDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]

})
export class SubmissionEditComponent implements OnInit {
  detail = {
    vendor:''
  }
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
    proposed_vendor:'',
    price: 0,
    ppn: 0,
    ongkir: 0,
    discountlevel:0,
    vendor_id: '',
    totalprice: 0,
    createuser:'',
    status: 0
  }
  submission = {
    submission_date :"",
    budgeting_number: "",
    createuser: "",
    id: 0,
    implementation_target: "",
    purchase_target: "",
    staff_name: "",
    subject:""
  }
  listOfCategories:any
  listOfProducts:any
  nonFilteredProducts:any
  productOption:any
  submission_id
  listOfVendors:any
  placementLocation=[{value:"1",name:"Surabaya"}, {value:"2",name:"Jakarta"}, {value:"3",name:"Malang"}, {value:"4",name:"Bali"}]
  constructor(
    private submissionService: SubmissionService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private productVendorService: ProductvendorService,
    private commonConfirmer: MatSnackBar
  ) {
    this.submission_id = this.activatedRoute.snapshot.params['id']
    this.submissionService.getSubmissionById(this.submission_id,(res:any) => {
      console.log("Submission result",res[0])
      this.submission = res[0]
      //this.submission.submission_date = "2019-10-01"
    })
    this.submissionService.getSubmissionDetails(this.submission_id,(res:any) => {
      console.log("Detail",res)
      this.getCategoryProducts(res[0].category_id)
      this.productVendorService.getVendorByProduct({product_id: res[0].product_id}, (result:any) =>{
        this.listOfVendors = result
      })
      this.submission_detail = res[0]
    })
    this.categoryService.getCategories((result:any) => {
      this.listOfCategories = result
      this.productOption = false
    })
  }
  implementationTarget(event:any){
    this.submission.implementation_target = event.targetElement.value
  }
  purchaseTarget(event:any){
    this.submission.purchase_target = event.targetElement.value
  }
  getCategoryProducts(categoryId:any){
   console.log("Category-product",categoryId)
   this.submission_detail.partnumber = ""
   this.submission_detail.itemname = ""
    this.productService.getProductByCategory({category_id: categoryId}, (result:any) => {
      console.log("List Of Products",result)
      this.listOfProducts = result
      this.nonFilteredProducts = result
    })
  }
  ngOnInit() {
  }
  _updateSubmission(submission:any){
    console.log("submission_detail",this.submission_detail)
    //this.submissionService.updateSubmission(submission,res => {
      this.submissionService.updatesubmissiondetail(this.submission_detail,(res:any) => {
        console.log("Update submission detail result",res)
        /*this.commonConfirmer.openFromComponent(CommonConfirmerComponent,{
          duration:3600,
          verticalPosition:'top',
          data:{
            alertText:'Data sudah terupdate',
            alertDetail:'Data sudah terupdate'
          }
        })*/
        window.location.href = '/landing'
      })
    //})
  }
  setVendorId(vendorName:any){
    for(let vendor of this.listOfVendors){
      if(vendor.name == vendorName){
        this.submission_detail.vendor_id = vendor.id
        this.submission_detail.proposed_vendor = vendor.name
      }
    }
  }
  calculateTotal(){
    let _xfactor = this.submission_detail.proposed_price*this.submission_detail.amount*this.submission_detail.discountlevel/100
    console.log("xfactor",_xfactor)
    this.submission_detail.proposed_totalprice = this.submission_detail.proposed_price*this.submission_detail.amount-_xfactor
    this.submission_detail.totalprice = this.submission_detail.proposed_totalprice
    console.log("tot",this.submission_detail.proposed_price*this.submission_detail.amount-_xfactor)
  }

  numCheck(event: any) {
    const pattern = /[0-9\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  cancel(){
    window.location.href = '/summary'
  }
}
