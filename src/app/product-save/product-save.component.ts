import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { VendorService } from '../vendor.service';
import { CategoryService } from '../category.service';
import { ProductvendorService } from '../productvendor.service'
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonConfirmerComponent } from '../common-confirmer/common-confirmer.component';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.css']
})

export class ProductSaveComponent implements OnInit {
	obj = {
	  category_id:0,
	  name:'',
	  partnumber:'',
	  unit:'',
	  createuser:''
	}
  noSaveAllowed = false
  vend={
    vendor_id:0,
  }

  selectedValue:any;
  cats: Array<any> = [];
  vendors: Array<any> = [];
  vendor:any
  logindata:any;
  vendorId = 0
  productId = 0
  categoryId = 0
  backButton = true
  normalSave = true //add product without default vendor and category
  listOfVendors:any

  fieldArray: Array<any> = []
  newAttribute: any = {}
  options: Array<string> = [];

  constructor(
    private product:ProductService,
    private vendorservice:VendorService,
    private category:CategoryService,
    private productVendorService: ProductvendorService,
    private auth:AuthService,
    private router:Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private commonConfirmer: MatSnackBar
  ) {
  this.vendorId = +this.route.snapshot.paramMap.get('idvendor')!
  this.categoryId = +this.route.snapshot.paramMap.get('idcategory')!

  this.auth.isLogin((result:any) => {
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
      this.obj.createuser = this.logindata.name
    });

    this.vendorservice.getVendors((result:any) => {
      if(this.vendorId > 0){
        for(let currentvendor of result){
          if(currentvendor.id == this.vendorId){
            this.vendors.push(currentvendor)
            this.vend.vendor_id = this.vendorId
          }
        }
      }else{
        this.normalSave = !this.normalSave
        this.listOfVendors = result
      }
    });

    this.category.getCategories((result:any) => {
      if(this.categoryId != 0){
        for(let currentcategory of result){
          if(currentcategory.id == this.categoryId){
            this.cats.push(currentcategory)
            this.obj.category_id = this.categoryId
          }
        }
        this.backButton=!this.backButton
      }else{
        for(let category of result){
          this.cats.push(category)
        }
      }
    });
  }
  checkInput(){
    if(this.vendor!=""){
      this.noSaveAllowed = false
    }
  }
  saveProduct(obj:any, callback:any){
    console.log("Selected Value",this.vend.vendor_id)
    console.log("Product save",obj)

    if(obj.name != '' && obj.unit != ''){
      this.product.saveProduct(obj,(result:any) => {
        console.log('testing')
        callback(result)        

      })
    }else{
      alert("Data tidak boleh kosong!");
      console.log("Error! data tidak lengkap")
    }
  }

  clearInput(){
    this.obj.name = '';
    this.obj.partnumber = '';
    this.obj.unit = '';
  }

  ngOnInit() {
  }
  replaceQuotes(obj:any,callback:any){
    callback({
      name:this.commonService.sanitizeString(obj.name),
      category_id:obj.category_id,
      partnumber:obj.partnumber,
      unit:obj.unit,
      createuser:obj.unit
    })
  }
  _saveProduct(obj:any){
    if(this.obj.category_id==0){
      this.commonConfirmer.openFromComponent(CommonConfirmerComponent,{
        duration:3600,
        verticalPosition:'top',
        data:{
          alertText:'Kategori belum diisi',
          alertDetail:'Data belum tersimpan'
        }
      })
    }else{
    this.replaceQuotes(obj,(res:any)=>{
      console.log("replace res",res)
      this.saveProduct(res, (result:any) => {
        if(result != null || result != ''){
           this.router.navigate(['/product']);
          }else{
            console.log('result', result)
        }
      })  
    })
  }
  }

  addFieldValue() {
    console.log("this.newAttribute", this.newAttribute)
    console.log("this.fieldArray", this.fieldArray)

    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
  }

  deleteFieldValue(index:any) {
    this.fieldArray.splice(index, 1);
  }

  setId(id:any){
    this.newAttribute.id=id
  }

  associateProduct(){
    this.product.getProducts((result:any) => {
      console.log('all product', result)
      for(let products of result){
        if(products.name === this.obj.name && products.category_id === this.obj.category_id 
        && products.partnumber === this.obj.partnumber && products.unit === this.obj.unit){
          this.productId = products.id

          //add to table productsvendors
          if(this.productId != 0){
            if(this.normalSave == false){
              for(let vendor of this.fieldArray){
                this.productVendorService.associateProductVendor({product_id: this.productId, vendor_id: vendor.id, createuser: this.obj.createuser}, (result:any) => {
                console.log('check', result)
                })
              }
              this.router.navigate(['/product']);
            }else{
              this.productVendorService.associateProductVendor({product_id: this.productId, vendor_id: this.vend.vendor_id, createuser: this.obj.createuser}, (result:any) => {
              console.log('check', result)
              this.router.navigate(['/product']);
              })
            }
          }
        }
      }
    })
    
  }

}
