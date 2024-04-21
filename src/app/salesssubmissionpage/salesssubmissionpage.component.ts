import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms'
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonConfirmerComponent } from '../common-confirmer/common-confirmer.component';
import { ImageService } from '../image.service';
import { CommonService } from '../common.service';
import { MailService } from '../mail.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-salesssubmissionpage',
  templateUrl: './salesssubmissionpage.component.html',
  styleUrls: ['./salesssubmissionpage.component.css'],
})
export class SalesssubmissionpageComponent implements OnInit {
  branches = [
    {name:'Surabaya'},
    {name:'Jakarta'},
    {name:'Malang'},
    {name:'Bali'}
  ]
  alertText = ''
  today = new Date()
  obj = {
        subject:'',
        budgeting_number:1,
        staff_name:'Puji',
        //submission_date:this.datePipe.transform(this.today,'yyyy-MM-dd'),
        submission_date:new Date(),
        //implementation_target:this.datePipe.transform(this.today,'yyyy-MM-dd'),
        implementation_target:'Pilihlah',//new Date(),
        //purchase_target:this.datePipe.transform(this.today,'yyyy-MM-dd'),
        purchase_target: 'Pilihlah',//new Date(),
        createuser:'Puji',
        user_id:1,
        division_id:1,
        city_id:1,
        quarter:1,
        year:this.datePipe.transform(this.today.getDate(),'yyyy')
        }
    detail = {
      vendor_id:1,
      product_id:1,
      submission_id:0,
      itemName:'',
      partnumber:'',
      brand:'',
      amount:1,
      discountlevel:1,
      proposed_price:0,
      proposed_totalprice:0,
      purchase_reason:'',
      price:0,
      totalprice:0,
      final_price:0,
      ongkir:0,
      ppn:0,
      description:'',
      placement_location:1,nopo:'',
      implementation_target:'',
      purchase_target:''
    }
    logindata:any
    cities = [{id:1,name:'Surabaya'},{id:2,name:'Jakarta'},{id:3,name:'Malang'},{id:4,name:'Bali'},]
    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());
    products:any
    nopo = ''
    constructor(
      private submissionService:SubmissionService,
      private datePipe:DatePipe,
      private productService:ProductService,
      private commonConfirmer: MatSnackBar,
      private auth: AuthService,
      private mailService:MailService,
      private roleService: RoleService,
      private router: Router,
      private imageService: ImageService,
      private commonService: CommonService,private datepipe:DatePipe) {
      this.productService.getProductByCategory({category_id:18},(products:any)=>{
        console.log("Products",products)
        this.products = products
      })
      this.auth.isLogin((result:any) => {
        this.logindata = result
        console.log("Login Data",this.logindata)
        if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
          this.router.navigate([  '/login']);
        }else{
        //add default value to inputs
        this.obj.createuser	= this.logindata.name
        this.obj.staff_name = this.logindata.name
        //this.submissionDetails.createuser = this.logindata.name
        }
      });
  
    }
    sendNotificationMail = function(obj:any,callback:any){
      let that = obj._this
      obj.verifiers.forEach(function(verifier:any){
        console.log('Verifieeer Mail',verifier.email)
        that.mailService.postMail({
          recipient:verifier.email,
          cc:that.logindata.creatoremail,
          msg:that.mailTemplateService.submissionCreateNotification(
            {
              creator:that.logindata.name,
              itemName:that.detail.itemName,
              submissionId:obj.submission_id
            }),
          subject:'Purchase Submission ('+that.detail.itemName+', '+that.logindata.name+')'
        },
        (mail:any)=>{
          console.log("Mail",mail)
        })
      })
      callback()
    }  
    changeProduct(product:any){
      this.detail.partnumber = product.partnumber
      this.detail.itemName = product.name
    }
  ngOnInit() {
    document.getElementById('scanPOImage')!.setAttribute('src',this.commonService.clickToUpload())
  }
  dateIsValid(){
    if((this.obj.implementation_target=='Pilihlah')||(this.obj.purchase_target == 'Pilihlah')){
      this.alertText = 'Date is not valid'
      return false
    }else{
      return true
    }
  }
  subjectIsValid(){
    if(this.obj.subject.trim()==""){
      this.alertText = 'Subject is not Valid'
      return false
    }else{
      return true
    }
  }
  productIsValid(){
    if(this.detail.itemName.trim()==""){
      this.alertText = 'Itemname is not Valid'
      return false
    }else{
      return true
    }
  }
  isValid(){
    if(this.subjectIsValid()&&this.dateIsValid()&&this.productIsValid()){
      return true
    }else{
      return false
    }
  }
  saveSubmission(obj:any){
    if(this.isValid()){
      let newdtstyle = false
      let mydate = {implementation_target:'',purchase_target:''}
      if(newdtstyle){
        mydate.implementation_target = obj.implementation_target._i.year+'-'+obj.implementation_target._i.month+'-'+obj.implementation_target._i.date 
        mydate.purchase_target = obj.purchase_target._i.year+'-'+obj.purchase_target._i.month+'-'+obj.purchase_target._i.date
      }else{
        mydate.implementation_target = this.datepipe.transform(obj.implementation_target, 'yyyy-MM-dd') || '{}'
        mydate.purchase_target = this.datePipe.transform(obj.purchase_target,'yyyy-MM-dd') || '{}'
      }

    this.submissionService.saveSubmission({
      subject:obj.subject,
      budgeting_number:1,
      staff_name:localStorage.getItem('username'),
      submission_date:this.datePipe.transform(this.today,'yyyy-MM-dd'),
      implementation_target : mydate.implementation_target,
      purchase_target: mydate.purchase_target,
      createuser:localStorage.getItem('username'),
      user_id:localStorage.getItem('id'),
      division_id:1,
      city_id:1,
      quarter:1,
      year:this.datePipe.transform(this.today.getDate(),'yyyy')
    },(res:any)=>{
      console.log('Res',res)
      let submission_id=res.insertId
      this.submissionService.saveSubmissionDetail({
        submission_id:res.insertId,
        product_id:this.detail.product_id,
        vendor_id:this.detail.vendor_id,
        itemname:this.detail.itemName,
        brand:this.detail.brand,
        partnumber:this.detail.partnumber,
        description:this.detail.description,
        proposed_vendor:'',
        amount:this.detail.amount,
        discountlevel:this.detail.discountlevel,
        proposed_price:this.detail.proposed_price,
        proposed_totalprice:this.detail.proposed_totalprice,
        price:this.detail.price,
        totalprice:this.detail.totalprice,
        information:'',
        purchase_reason:this.detail.purchase_reason,
        guarantee:'',
        ppn:this.detail.ppn,
        ongkir:this.detail.ongkir,
        note:'',
        placement_location:this.detail.placement_location,
        createuser:''
      },(subdetailres:any)=>{
        console.log('subdetailres',subdetailres)
        this.submissionService.updatePO({
          scanpo:document.getElementById('scanPOImage')!.getAttribute('src'),
          nopo:this.nopo,
          id:submission_id
        },(res:any)=>{
          console.log('Upload PO',res)



          this.roleService.getRoleMails({identifier:'verifier'},(res:any)=>{
            let that = this
            this.sendNotificationMail({_this:this,verifiers:res,submission_id:submission_id},function(){
              window.location.href = "/landing"
            }
            )
          })  


//          window.location.href = '/landing'
        })
      })
    })}else{
      console.log('Date is not valid')
      this.commonConfirmer.openFromComponent(CommonConfirmerComponent,{
        duration:3600,
        verticalPosition:'top',
        data:{
          alertText:this.alertText,
          alertDetail:'Data belum tersimpan'
        }
      })

    }
  }
  showInputDialog(){
    document.getElementById('uplComponent')!.click()
  }
  uploadFile(event:any){
    this.imageService.loadImage1(event,1080,(result:any)=>{
      document.getElementById('scanPOImage')!.setAttribute('src',result)
    })
  }

}
