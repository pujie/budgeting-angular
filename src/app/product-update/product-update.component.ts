import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { VendorService } from '../vendor.service';
import { CategoryService } from '../category.service';
import { ProductvendorService } from '../productvendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})

export class ProductUpdateComponent implements OnInit {

  obj = {
    id: 0,
    category_id:0,
    name:'',
    partnumber:'',
    unit:'',
    createuser:''
  }

  vend={
    vendor_id:0,
  }
  vendor_id:any
  products={
    name:'',
    partnumber:'',
    unit:'',
  }

  selectedValue:any;
  cats: Array<any> = [];
  vendors:any//: Array<any> = [];
  logindata:any;
  vendorId = 0
  productId = 0
  categoryId = 0
  backButton = true
  normalSave = false //add product without default vendor and category
  listOfVendors:any
  listProductVendor:any

  newAttribute: any = {}
  options: Array<string> = [];

  constructor(
    private productvendor:ProductvendorService, 
    private product:ProductService, 
    private vendor:VendorService, 
    private category:CategoryService, 
    private router:Router, 
    private activatedRoute: ActivatedRoute
  ) {
    const urlid = +this.activatedRoute.snapshot.paramMap.get('id')!;
    this.product.getProduct({id:urlid}, (result:any) => {
      this.obj = result
      console.log("Successssss",this.obj)
    });
    this.vendor.getVendors((result:any) => {
      this.vendors = result
      console.log("Vendors retrieved",this.vendors)
    });
    this.product.getvendorbyproduct({product_id:urlid},(result:any) => {
      console.log("getVendor by product",result)
      if(result.length>0){
        this.vendor_id = result[0].id
      }
    })
  this.category.getCategories((result:any) => {
      this.cats = result
    });
    this.productvendor.getVendorByProduct({product_id:urlid}, (result:any) => {
      this.listProductVendor=result;
    });
  }
  clearInput(){
    this.obj.name = '';
    this.obj.partnumber = '';
    this.obj.unit = '';
    this.obj.category_id = 0;
  }
  updateProduct(obj:any){
    console.log("Update product invoked",obj)
    this.product.updateProduct(obj, (result:any) => {
      console.log("Update Product",result)
      if(result != null || result != ''){
          this.reassociateProduct()
          //this.router.navigate(['/product']);
        }else{
          console.log('result', result)
      }
    })
  }
  setId(id:any){
    this.newAttribute.id=id
  }
  reassociateProduct(){
    this.productvendor.removeAllAssociatedVendors({id:this.obj.id}, (result:any) => {
        console.log("removeAllAssociatedProducts",result)
        this.productvendor.associateProductVendor({
          product_id: this.obj.id, 
          vendor_id: this.vendor_id, 
          createuser: 'puji'
        }, (result:any) => {
          console.log('associate product vendor After Unassociate', result)
          this.router.navigate(['/product']);
          })
      })
  }
  ngOnInit() {
  }
}
