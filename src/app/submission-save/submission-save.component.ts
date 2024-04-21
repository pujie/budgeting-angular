import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { SubmissionService } from '../submission.service';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ProductvendorService } from '../productvendor.service';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { CommonConfirmerComponent } from '../common-confirmer/common-confirmer.component';
import { MailService } from '../mail.service';
import { RoleService } from '../role.service';
import { MailTemplateService } from '../mail-template.service';
import { NotesService } from '../notes.service';
import { CommonService } from '../common.service';
import { CityService } from '../city.service';
import { CrudService } from '../crud.service';
//import { callbackify } from 'util';

export interface DialogData {
  id: Number;
  user: String;
}

@Component({
  selector: 'app-submission-save',
  templateUrl: './submission-save.component.html',
  styleUrls: ['./submission-save.component.css']
})
export class SubmissionSaveComponent implements OnInit {

  //variables for details table
  currentDate = new Date(); //today's date by the system
  displayedColumns: string[] = ['itemname', 'partnumber', 'brand', 'proposed_vendor',
    'proposed_price', 'amount', 'discount_level', 'proposed_totalprice', 'description'];
  fieldArray :any[] = [];
  newAttribute: any = {
    amount:1,discountlevel:0
  }
  totalprice: number = 0
  discountprice: number = 0
  listOfVendors:any;
  listOfProducts:any;
  listOfCategories:any;
  addNewVendorOption = true
  productOption = true
  options: Array<string> = [];
  currentProduct:any;
  currentVendor:any;
  vendors:any;
  filteredOptions: Observable<string[]> = new Observable<string[]>;

  //no budgeting generator
  allSubmissions:any;
  newestSubmissionId=-1;

  noBudgeting="";
  ctrNoBudgeting=0

	//Variable for table submissions
	submission = {
		submission_date: this.currentDate,
		staff_name:'',
    subject: '',
		implementation_target: null,
		purchase_target: null,
    budgeting_number: '',
		createuser:''
	}

	//Variable for table submission details
	submissionDetails = {
		submission_id:'',
		product_id:'',
		vendor_id:'',
		itemname:'',
		brand:'',
		partnumber:'',
		description:'',
		proposed_vendor:'',
		amount:'',
		proposed_price:'',
    proposed_totalprice:'',
    price:'',
    totalprice:'',
		information:"",
		purchase_reason:'',
		placement_location:'',
    discountlevel: 0,
    guarantee: '',
    note: '',
		createuser:'',
    ppn:0,
    ongkir:0,
    createdate:''
	}

  logindata:any;
  nonFilteredProducts:any;
  detail = {
    vendor:'',
    product:'',
    price:0
  }
  percentDiscount:any
  discount:any
  totalPrice = 0
  tempNumber:any
  cities:any
  placementLocation=["Jakarta", "Surabaya", "Bali", "Malang"]
  constructor(
  	private submissionService: SubmissionService,
    private productService: ProductService,
    private vendorService: VendorService,
    private productvendorService: ProductvendorService,
    private categoryService: CategoryService,
  	private router: Router,
  	private auth: AuthService,
    public dialog: MatDialog,
  	public datepipe: DatePipe,
    public curPipe: CurrencyPipe,
    private commonConfirmer: MatDialog,
    private mailService: MailService,
    private roleService: RoleService,
    private mailTemplateService: MailTemplateService,
    private notesService: NotesService,
    private commonService: CommonService,
    private cityService: CityService,
    private crudService:CrudService
    //public dialogRef: MatDialogRef<SubmissionSaveComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.cityService.getCities((cities:any)=>{
      this.cities = cities
    })
    //check login
  	this.auth.isLogin((result:any) => {
      this.logindata = result
      console.log("Login Data",this.logindata)
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate([  '/login']);
      }else{
    	//add default value to inputs
    	this.submission.createuser	= this.logindata.name
    	this.submission.staff_name = this.logindata.name
    	this.submissionDetails.createuser = this.logindata.name
      }
    });

    this.categoryService.getCategories((result:any) => {
      this.listOfCategories = result
      this.productOption = false
    })

    this.submissionService.getSubmissions((result:any) => {
      this.allSubmissions = result
      console.log('this.allSubmissions',this.allSubmissions)
      for (var i = 0; i < this.allSubmissions.length; i++) {
         console.log(this.datepipe.transform(this.currentDate, 'yyyyMM'))
         console.log(this.datepipe.transform(this.allSubmissions[i].createdate, 'yyyyMM'))
        if (this.datepipe.transform(this.currentDate, 'yyyyMM')==this.datepipe.transform(this.allSubmissions[i].createdate, 'yyyyMM')){
          console.log("this montyYear exists bro ...",this.ctrNoBudgeting)
          this.ctrNoBudgeting++;
        }
      }

      //this.noBudgeting=this.datepipe.transform(this.currentDate, 'yyyyMM/')+"BUD/"+(this.ctrNoBudgeting+1)
      this.getMaxNum((num:any)=>{
        this.noBudgeting=this.datepipe.transform(this.currentDate, 'yyyyMM/')+"BUD/"+(num)
      })
    })
 }
 getMaxNum(callback:any){
  this.crudService.doGet({url:'/getcountbudgetingnumthisyear'},(res:any)=>{
    if(res.cnt>0){
      this.crudService.doGet({url:'/getmaxbudgetingnumthisyear'},(res:any)=>{
        callback(res.maxnum+1)
      })
    }else{
      callback(1);
    }
  })
 }
clearInput(){
  this.submission.staff_name=this.logindata.name;
  this.submission.implementation_target=null;
  this.submission.purchase_target=null;
  this.submissionDetails.information = '';
  this.submissionDetails.purchase_reason = '';
  this.submissionDetails.placement_location = '';
  alert("Input values has been reset!")
}
cancel(){
  this.router.navigateByUrl('/landing')
}
cekVendor(){
  console.log("vendorId",this.newAttribute.vendorId)
  if(this.newAttribute.vendorId){
    return true
  }else{
    return false
  }
}
cekentry(){
  if(this.cekVendor()){
    return true
  }else{
    return false
  }
}
  saveSubmission(submission:any, callback:any){
    let _date = new Date()
  	//change all date format into YYYY-MM-DD format in String
  	submission.submission_date = this.datepipe.transform(submission.submission_date, 'yyyy-MM-dd')
  	submission.implementation_target = this.datepipe.transform(submission.implementation_target, 'yyyy-MM-dd')
  	submission.purchase_target = this.datepipe.transform(submission.purchase_target, 'yyyy-MM-dd')
    submission.budgeting_number = this.noBudgeting
    submission.user_id = this.logindata.id
    submission.division_id = this.logindata.division_id
    submission.city_id = this.newAttribute.placement_location;
    submission.quarter = this.commonService.quarter_of_the_year(_date);
    submission.year = _date.getFullYear()

  	if(
      this.submission.staff_name != '' &&
      this.submission.implementation_target != '' &&
      this.submission.purchase_target != '' &&
      this.submission.implementation_target != null &&
      this.submission.purchase_target != null &&
      this.cekentry() &&
      this.submission.subject.trim() != "" && this.newAttribute.proposed_price!=""
    ){
  		this.submissionService.saveSubmission(submission, (result:any) => {
        callback(result)
  		})
  	}else{
      this.commonConfirmer.open(CommonConfirmerComponent,{
        data:{
          alertText:'Isian harus lengkap',
          alertDetail:'Data belum tersimpan'
        },
        width:'720px'
      })
  	}
  }
  _saveSubmission(submission:any){
    let _date = new Date()
    submission.division_id = this.logindata.division_id
    submission.city_id = this.newAttribute.placement_location;
    submission.quarter = this.commonService.quarter_of_the_year(_date);
    submission.year = _date.getFullYear()
    submission.subject = this.commonService.sanitizeString(submission.subject)
    console.log("Submission got",submission)
    this.saveSubmission(submission, (result:any) => {
      console.log("DEtail",result)
      this.saveSubmissionDetails(result.insertId)
    })
  }
  sendNotificationMail = function(obj:any,callback:any){
    let that = obj.sender
    obj.verifiers.forEach(function(verifier:any){
      console.log('Verifieeer Mail',verifier.email)
      that.mailService.postMail({
        recipient:verifier.email,
        cc:that.logindata.creatoremail,
        msg:that.mailTemplateService.submissionCreateNotification(
          {
            creator:that.logindata.name,
            itemName:that.newAttribute.item,
            submissionId:obj.submission_id
          }),
        subject:'Purchase Submission ('+that.newAttribute.item+', '+that.logindata.name+')'
      },
      (mail:any)=>{
        console.log("Mail",mail)
      })
    })
    callback()
  }

  saveSubmissionDetails(submission_id:any){
    this.submissionDetails.submission_id = submission_id
    this.submissionDetails.product_id = this.newAttribute.productId
    this.submissionDetails.vendor_id = this.newAttribute.vendorId
    this.submissionDetails.itemname =  this.commonService.sanitizeString(this.newAttribute.item)
    this.submissionDetails.brand = this.newAttribute.brand
    this.submissionDetails.partnumber = this.newAttribute.partnumber
    this.submissionDetails.description = this.commonService.sanitizeString(this.newAttribute.description)
    this.submissionDetails.proposed_vendor = this.newAttribute.proposed_vendor
    this.submissionDetails.amount = this.newAttribute.amount
    this.submissionDetails.proposed_price = this.newAttribute.proposed_price
    this.submissionDetails.discountlevel = this.newAttribute.discountlevel
    this.submissionDetails.proposed_totalprice = this.newAttribute.proposed_totalprice
    this.submissionDetails.information = " "
    this.submissionDetails.purchase_reason = this.commonService.sanitizeString(this.newAttribute.purchase_reason)
    this.submissionDetails.placement_location = this.newAttribute.placement_location
    this.submissionDetails.ppn = 0
    this.submissionDetails.ongkir = 0
    this.submissionDetails.price  = this.newAttribute.proposed_price
    this.submissionDetails.totalprice  = this.newAttribute.proposed_totalprice

    console.log("SubmissionDetails tosave",this.submissionDetails)
    this.submissionService.saveSubmissionDetail(this.submissionDetails,(detail:any) => {
      if(detail != null){
        this.productService.updatePrice({
          vendor_id:this.newAttribute.vendorId,
          product_id:this.newAttribute.productId,
          price:this.newAttribute.proposed_price
        },(result:any) => {
          let todate = new Date() 
          this.notesService.addNote(
            {
              description:this.commonService.sanitizeString(this.newAttribute.description),
              submission_id:submission_id,
              createuser:this.commonService.sanitizeString(this.logindata.name),
              createdate:this.datepipe.transform(todate,'yyyy-MM-dd')
            },(res:any)=>{
            this.roleService.getRoleMails({identifier:'verifier'},(res:any)=>{
              let that = this
              this.sendNotificationMail({sender:this,verifiers:res,submission_id:submission_id},function(){
                window.location.href = "/landing"
              }
              )
            })  
          })
        })
      }else{
        window.location.href = "/landing"
      }
    })
  }
  deleteFieldValue(index:any) {
    this.fieldArray.splice(index, 1);
  }
  changeFocus(event:any, newFocus:any){
    if(event.key === "Enter"){
      newFocus.focus();
    }
  }
  numCheck(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
  }

  addDetail(){
    const dialogRef = this.dialog.open(SubmissionDetailDialog, {
    width: '1000px',
    data: {user: this.logindata.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null){
        alert("Detail saved")
        console.log('Detail Result',result)
        this.fieldArray.push(result)
      }else{
        alert("Detail not saved, please input again")
      }
    })
  }
  getCategoryProducts(categoryId:any){
    console.log("category product",categoryId)
    this.newAttribute.item=""
    this.newAttribute.partnumber=""
    this.productService.getProductByCategory({category_id: categoryId}, (result:any) => {
      this.listOfProducts = result
      this.nonFilteredProducts = result
    })
  }

  autoFill(productName:any){
    console.log('autofill invoked',productName)
    for (let product of this.listOfProducts){
      console.log("Product looped",product)
      if(product.name === productName){
        this.currentProduct = product
      }
    }
    this.newAttribute.partnumber = this.currentProduct.partnumber
    this.newAttribute.productId = this.currentProduct.id
    this.newAttribute.proposed_vendor = ''

    //fill the option for proposed vendor
    this.productvendorService.getVendorByProduct({product_id: this.currentProduct.id}, (result:any) =>{
      this.listOfVendors = result
    })

    this.newAttribute.amount = 1
    this.newAttribute.discountlevel = 0
    this.addNewVendorOption = false

  }

  setVendorId(vendorName:any){
    for(let vendor of this.listOfVendors){
      if(vendor.name == vendorName){
        this.newAttribute.vendorId = vendor.id
        this.newAttribute.proposed_vendor = vendor.name
      }
    }
  }
  calculateTotal(){
    let _xfactor = this.newAttribute.proposed_price*this.newAttribute.amount*this.newAttribute.discountlevel/100
    console.log("Proposed Price",this.newAttribute.proposed_price)
    console.log("amount",this.newAttribute.amount)
    console.log("discountlevel",this.newAttribute.discountlevel)
    console.log("xfactor",_xfactor)
    this.newAttribute.proposed_totalprice = this.newAttribute.proposed_price*this.newAttribute.amount-_xfactor
    console.log("tot",this.newAttribute.proposed_price*this.newAttribute.amount-_xfactor)
  }
  calculateDiscount(){
    let _total = (this.newAttribute.proposed_price*this.newAttribute.amount)
    console.log("_total",_total)
    this.newAttribute.discountlevel = 100*((_total - this.newAttribute.proposed_totalprice)/_total)
    console.log("total-fact",_total - this.newAttribute.proposed_totalprice)
  }
  calculateDiscountx(amount:any, price:any, totalprice:any){

    console.log('calculatediscount invoked',this.newAttribute.amount,this.newAttribute.proposed_price,this.newAttribute.proposed_totalprice)
    if(price == undefined || amount == undefined || totalprice == undefined || (price == 0 && totalprice == 0)){
      this.percentDiscount = 0
      console.log("A",this.percentDiscount)
    }else{
      this.discount=(totalprice-(price*amount))
      console.log("Discount",this.discount)
      this.percentDiscount=this.discount/(price*amount)*(-100)
      console.log("B, percentDiscount : ",this.percentDiscount)
    }

    if(price != undefined && amount != undefined){
      this.totalPrice = parseInt(price)*parseInt(amount)
      this.newAttribute.proposed_totalprice = this.totalPrice
      console.log('calculate total price',price,amount,this.totalPrice)
      console.log("C",this.percentDiscount)
    }

    if (this.percentDiscount<0) {
      this.newAttribute.discountlevel = 0
      console.log("D",this.percentDiscount)
    } else{
      this.newAttribute.discountlevel = this.percentDiscount
      console.log("E",this.percentDiscount)
    }
  }

  checkAmount(amount:any){
    if (amount<1) {
      this.newAttribute.amount=1
    }
  }


  maxCheck(currentNumber:any, amount:any, maxLimit:any, event:any){
    if(currentNumber>maxLimit*amount && event.keyCode != 8 && event.keyCode != 46){
      this.newAttribute.proposed_totalprice=this.tempNumber
      //this.calculateDiscount(amount, maxLimit, this.newAttribute.proposed_totalprice)
      // event.preventDefault();
    }else{
      this.tempNumber=currentNumber
      //this.calculateDiscount(amount, maxLimit, currentNumber)
    }
  }
  openAddVendorDialog(productId:any) {
    const dialogRef = this.dialog.open(SubmissionVendorDialog, {
    width: '750px',
    data: {id: productId, user: this.logindata.name}
    });
    dialogRef.afterClosed().subscribe(newVendor => {
      console.log("REsulte newvendor",newVendor)
      console.log("Isi Detail",this.detail)
      if(newVendor != null){
        this.listOfVendors.push(newVendor)
        //this.detail.vendor = newVendor.id
        this.newAttribute.vendorId = newVendor.id
        this.submissionDetails.proposed_vendor = newVendor.name
      }
    })
  }
}

//component for add new product detail into submission detail table dialog
@Component({
  selector: 'app-submission-save',
  templateUrl: 'submission-save-detail-dialog.html',
  styleUrls: ['./submission-save.component.css']
})

export class SubmissionDetailDialog {

  newAttribute: any = {
    amount : 1,
    proposed_price:0,
    discountlevel:0,
    proposed_totalprice:0
  }
  listOfProducts:any
  currentProduct:any
  listOfVendors:any
  nonFilteredProducts:any;
  addNewVendorOption=true
  listOfCategories:any
  productOption = true
  logindata:any;
  discount:any
  totalPrice = 0
  percentDiscount:any
  tempNumber=0

  placementLocation=["Jakarta", "Surabaya", "Bali", "Malang"]
  existingUnassociatedVendor:any
  constructor(
    private vendorService:VendorService,
    private productvendorService: ProductvendorService,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SubmissionDetailDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
      this.logindata=data.user

      this.categoryService.getCategories((result:any) => {
        this.listOfCategories = result
        this.productOption = false
      })
    }

    cancel(){
      this.dialogRef.close();
    }

    getCategoryProducts(categoryId:any){
      console.log("Category-product",categoryId)
      this.newAttribute.item=""
      this.newAttribute.partnumber=""
      this.productService.getProductByCategory({category_id: categoryId}, (result:any) => {
        this.listOfProducts = result
        this.nonFilteredProducts = result
      })
    }

    filter(productName:any){
      var filteredProduct = []
      if(productName == ''){
        this.listOfProducts = this.nonFilteredProducts
      }else{
        for(let index in this.nonFilteredProducts){
          if(this.nonFilteredProducts[index].name.toLowerCase().includes(productName.toLowerCase())){
            filteredProduct.push(this.nonFilteredProducts[index])
          }

          if(parseInt(index) == this.nonFilteredProducts.length-1){
            this.listOfProducts = filteredProduct
          }
        }
      }
    }

    autoFill(productName:any){
      for (let product of this.listOfProducts){
        if(product.name === productName){
          this.currentProduct = product
        }
      }
      this.newAttribute.partnumber = this.currentProduct.partnumber
      this.newAttribute.productId = this.currentProduct.id
      this.newAttribute.proposed_vendor = ''

      //fill the option for proposed vendor
      this.productvendorService.getVendorByProduct({product_id: this.currentProduct.id}, (result:any) =>{
        this.listOfVendors = result
      })

      this.newAttribute.amount = 1
      this.newAttribute.discountlevel = 0
      this.addNewVendorOption = false
    }

    setVendorId(vendorName:any){
      for(let vendor of this.listOfVendors){
        if(vendor.name == vendorName){
          this.newAttribute.vendor_id = vendor.id
          this.newAttribute.proposed_vendor = vendor.name
        }
      }
    }
    calculateTotal(){
      let _xfactor = this.newAttribute.proposed_price*this.newAttribute.amount*this.newAttribute.discountlevel/100
      console.log("xfactor",_xfactor)
      this.newAttribute.proposed_totalprice = this.newAttribute.proposed_price*this.newAttribute.amount-_xfactor
      console.log("tot",this.newAttribute.proposed_price*this.newAttribute.amount-_xfactor)
    }
    calculateDiscount(){
      let _total = (this.newAttribute.proposed_price*this.newAttribute.amount)
      console.log("_total",_total)
      this.newAttribute.discountlevel = 100*((_total - this.newAttribute.proposed_totalprice)/_total)
      console.log("total-fact",_total - this.newAttribute.proposed_totalprice)
    }
    calculateDiscountx(amount:any, price:any, totalprice:any){

      console.log('calculatediscount invoked',this.newAttribute.amount,this.newAttribute.proposed_price,this.newAttribute.proposed_totalprice)
      if(price == undefined || amount == undefined || totalprice == undefined || (price == 0 && totalprice == 0)){
        this.percentDiscount = 0
        console.log("A",this.percentDiscount)
      }else{
        this.discount=(totalprice-(price*amount))
        console.log("Discount",this.discount)
        this.percentDiscount=this.discount/(price*amount)*(-100)
        console.log("B, percentDiscount : ",this.percentDiscount)
      }

      if(price != undefined && amount != undefined){
        this.totalPrice = parseInt(price)*parseInt(amount)
        this.newAttribute.proposed_totalprice = this.totalPrice
        console.log('calculate total price',price,amount,this.totalPrice)
        console.log("C",this.percentDiscount)
      }

      if (this.percentDiscount<0) {
        this.newAttribute.discountlevel = 0
        console.log("D",this.percentDiscount)
      } else{
        this.newAttribute.discountlevel = this.percentDiscount
        console.log("E",this.percentDiscount)
      }
    }

    checkAmount(amount:any){
      if (amount<1) {
        this.newAttribute.amount=1
      }
    }

    numCheck(event: any) {
      const pattern = /[0-9\ ]/;

      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

    maxCheck(currentNumber:any, amount:any, maxLimit:any, event:any){
      if(currentNumber>maxLimit*amount && event.keyCode != 8 && event.keyCode != 46){
        this.newAttribute.proposed_totalprice=this.tempNumber
        //this.calculateDiscount(amount, maxLimit, this.newAttribute.proposed_totalprice)
        // event.preventDefault();
      }else{
        this.tempNumber=currentNumber
        //this.calculateDiscount(amount, maxLimit, currentNumber)
      }
    }

    openAddVendorDialog(productId:any) {
      const dialogRef = this.dialog.open(SubmissionVendorDialog, {
      width: '750px',
      data: {id: productId, user: this.logindata.name}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("REsulte",result)
        if(result != null){
          this.listOfVendors.push(result)
        }
      })
    }

    addVendor() {
      console.log("Vendor Should be updated")
      this.dialogRef.close(this.newAttribute);
    }
}

//Component for add new vendor to product dialog
@Component({
  selector: 'app-submission-save',
  templateUrl: 'submission-save-dialog.html',
  styleUrls: ['./submission-save.component.css']
})

export class SubmissionVendorDialog {

  vend;
  nonAssociatedVendors: Array<any> = [];
  selectedVendor: Number = 0;
  productId: Number;
  user: String;
  AssociatedVendor:any;
  existingUnassociatedVendor:any
  constructor(
    private vendorService:VendorService,
    private productvendorService: ProductvendorService,
    public dialogRef: MatDialogRef<SubmissionVendorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.productId = data.id
    this.user = data.user
    this.vend = {
      name: '',
      address:'',
      phone: '',
      bankaccount: '',
      namecard:''
    }

    this.productvendorService.getVendorByProduct({product_id: this.productId}, (result:any) => {
      this.getNonAssociatedVendors(result)
    })
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  getNonAssociatedVendors(associatedVendors:any){
    this.vendorService.getVendors((result:any) => {
        this.nonAssociatedVendors = result

        if(associatedVendors != null){
          for(let index in result){
            for(let assocVendor of associatedVendors){
              if(this.nonAssociatedVendors[ <any> index].id == assocVendor.id){
                this.nonAssociatedVendors.splice(parseInt(index), 1)
              }
            }
          }
        }
        console.log('result', this.nonAssociatedVendors)
    })
  }
  onSaveClick(dataa: DialogData) {
    this.vendorService.saveVendor(this.vend, (createdVendor:any) => {
      this.productvendorService.associateProductVendor(
        {
          product_id: this.productId, vendor_id: createdVendor.insertId, createuser: this.user,price:0
        }, (associated:any) =>{
        console.log("Result,result",associated)
        this.dialogRef.close(
          {
            id:createdVendor.insertId,name:this.vend.name,
            address:this.vend.address,
            phone:this.vend.phone,
            bankaccount:this.vend.bankaccount,
            namecard:this.vend.namecard
          }
        );
      })
    })
  }
  onClearClick() {
    this.vend.name = ''
    this.vend.address = ''
    this.vend.phone = ''
    this.vend.bankaccount = ''
  }
  checkNewVendor(vendorID:any){
    this.selectedVendor = vendorID
    this.vendorService.getVendor({id: this.selectedVendor}, (result:any) => {
        this.AssociatedVendor = result
    })
  }
  addVendorToProduct(){
    this.productvendorService.associateProductVendor(
      {
        product_id: this.productId, 
        vendor_id: this.selectedVendor, 
        createuser: this.user,
        price:0
      }, (result:any) =>{
        console.log("Associated result",result)
        console.log("Vendor associated",this.existingUnassociatedVendor)
    })
    this.dialogRef.close(          {
      id:this.existingUnassociatedVendor.id,name:this.existingUnassociatedVendor.name,
      address:this.existingUnassociatedVendor.address,
      phone:this.existingUnassociatedVendor.phone,
      bankaccount:this.existingUnassociatedVendor.bankaccount,
      namecard:this.existingUnassociatedVendor.namecard
    }
);
  }
  numCheck(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  vendorIsNotValid(){
    if(!this.existingUnassociatedVendor){
      return true
    }else{
      return false
    }
  }
  entryIsNotValid(){
    let notValid = false
    if(this.vend.name.trim()==""){
      notValid = true
    }
    if(this.vend.address.trim()==""){
      notValid = true
    }
    return notValid
  }
}
