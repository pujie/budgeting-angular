import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { DatePipe } from '@angular/common'
import { SubmissionService } from '../submission.service';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../image.service';
import { ProductService } from '../product.service';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-salessubmissionedit',
  templateUrl: './salessubmissionedit.component.html',
  styleUrls: ['./salessubmissionedit.component.css']
})
export class SalessubmissioneditComponent implements OnInit {
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
        submission_date:new Date(),
        implementation_target:'Pilihlah',
        purchase_target: 'Pilihlah',
        createuser:'Puji',
        user_id:1,
        division_id:1,
        city_id:1,
        quarter:1,
        year:this.datePipe.transform(this.today.getDate(),'yyyy')
        }
    detail = {
      subject:'',
      vendor_id:1,
      product_id:1,
      submission_id:0,
      itemname:'',
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
      placement_location:1,
      implementation_target:'',
      purchase_target:'',nopo:''
    }
    cities = [{id:1,name:'Surabaya'},{id:2,name:'Jakarta'},{id:3,name:'Malang'},{id:4,name:'Bali'},]
    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());
    products:any
    nopo = ''

  constructor(
    private datePipe: DatePipe,
    private submissionService: SubmissionService,
    private activateRoute: ActivatedRoute,
    private imageService: ImageService,
    private productService: ProductService,
    private commonService: CommonService) {
      let submissionId = this.activateRoute.snapshot.params['submission_id']
    this.submissionService.getSubmissionDetail(submissionId,(res:any)=>{
      this.detail = res[0]
      this.detail.placement_location = parseInt(res[0].placement_location)
      console.log('Implementation Date',res[0])
      if(!res[0].scanpo){
        document.getElementById('scanPOImage')!.setAttribute('src',this.commonService.clickToUpload())
      }else{
      this.commonService.convertoblob(res[0].scanpo.data,(blob:any)=>{
        this.imageService.createImageFromBlob(blob,(image:any)=>{
          document.getElementById('scanPOImage')!.setAttribute('src',image)
        })
      })}
    })
    this.productService.getProductByCategory({category_id:18},(products:any)=>{
      console.log("Products",products)
      this.products = products
    })

  }
  implementationTarget(event:any){
    console.log('Implementation Target',event.targetElement.value)
    this.commonService.createSQLDateFormat(event.targetElement.value,(res:any)=>{
      console.log('Convert Date Res',res)
      this.detail.implementation_target = res
    })
    
  }
  purchaseTarget(event:any){
    console.log('Purchase Target',event.targetElement)
    this.commonService.createSQLDateFormat(event.targetElement.value,(res:any)=>{
      this.detail.purchase_target = res
    })
  }
  removeQuotes(obj:any,callback:any){
    console.log("replaced",obj.replace('"','\"').replace("'","\'"))
    callback (obj.replace('"','\"').replace("'","\'"));
  }
  updateSubmission(obj:any){
    console.log('Obj to update',obj)
    this.submissionService.updatesalessubmissiondetail(obj,(result:any)=>{
      console.log('result',result)
      this.removeQuotes(this.detail.subject,(sbj:any)=>{
        console.log("SBJ",sbj)
        this.submissionService.updatesalessubmission(
          {
            id:this.detail.submission_id,
            implementation_target:this.commonService.getstrindate(this.detail.implementation_target),
            purchase_target:this.commonService.getstrindate(this.detail.purchase_target),
            subject:sbj,
            amount:this.detail.amount,
            totalprice:this.detail.totalprice
          },(result:any)=>{
          console.log('result',result)
          this.submissionService.updatePO({
            scanpo:document.getElementById('scanPOImage')!.getAttribute('src'),
            nopo:this.detail.nopo,
            id:this.detail.submission_id
          },(res:any)=>{
            console.log('Upload PO',res)
            window.location.href = '/landing'
          })
    
        })
  
      })
      })
  }
  ngOnInit() {
  }
  showInputDialog(){
    document.getElementById('uplComponent')!.click()
  }
  uploadFile(event:any){
    this.imageService.loadImage1(event,1080,(result:any)=>{
      document.getElementById('scanPOImage')!.setAttribute('src',result)
    })
  }
  changeProduct(product:any){
    console.log('Change Product',product)
    this.detail.partnumber = product.partnumber
    this.detail.itemname = product.name
  }

}
