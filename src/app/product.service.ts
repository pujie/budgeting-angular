import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
product : Observable<any> = new Observable<any> 
products : Observable<any[]> = new Observable<any[]> 
productImage:Observable<Blob> = new Observable<Blob> 

constructor(private http: HttpClient,private appvar : AppvarsService) {}
  getProducts(callback:any){
    this.products = this.http.get<any[]>(this.appvar.server+'/getproducts')
    this.products.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getProduct(obj:any,callback:any){
    this.product = this.http.get<any>(this.appvar.server+'/getproduct/'+obj.id)
    this.product.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  getProductpage(obj:any, callback:any){
    this.product = this.http.get<any[]>(this.appvar.server+'/getproductpage/'+obj.pageIndex+'/'+obj.pageSize)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getProductCount(callback:any){
    this.product = this.http.get<any>(this.appvar.server+'/getproductcount')
    this.product.subscribe(
      data => {
        callback(data[0].cnt)
      },
      err => {
        callback(err)
      }
    )
  }
  getProductByCategory(obj:any, callback:any){
    this.product = this.http.post<any[]>(this.appvar.server+'/getproductbycategory', obj)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getProductByVendorCategory(obj:any, callback:any){
    this.product = this.http.post<any[]>(this.appvar.server+'/getproductbyvendorcategory', obj)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  searchProduct(obj:any, callback:any){
    this.product = this.http.post<any[]>(this.appvar.server+'/searchproduct',obj)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  searchProductCount(obj:any, callback:any){
    this.product = this.http.post<any>(this.appvar.server+'/searchproductcount',obj)
    this.product.subscribe(
      data => {
        callback(data[0].cnt)
      },
      err => {
        callback(err)
      }
    )
  }
  saveProduct(obj:any, callback:any){
    this.product = this.http.post<any>(this.appvar.server+'/saveproduct',obj)
    this.product.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  updateProduct(obj:any, callback:any){
    this.product = this.http.post<any>(this.appvar.server+'/updateproduct',obj)
    this.product.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  setStatusProduct(obj:any, callback:any){
    this.product = this.http.get<any>(this.appvar.server+'/setproductactive/'+obj.id+'/'+obj.status)
    this.product.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }

  //Product's Images
  getProductImages(productId:any, callback:any){
    this.productImage = this.http.get<any>(this.appvar.server+'/getproductimages/'+productId)
    this.productImage.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  updatePrice(obj:any, callback:any){
    this.product = this.http.post(this.appvar.server+'/updateprice',obj)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  saveProductImage(productImage:any, callback:any){
    this.product = this.http.post<any>(this.appvar.server+'/saveproductimage', productImage)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  updateProductImage(productImage:any, callback:any){
    this.product = this.http.post<any>(this.appvar.server+'/updateproductimage', productImage)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  deleteProductImage(imageId:any, callback:any){
    this.product = this.http.get<any>(this.appvar.server+'/deleteproductimage/'+imageId)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getvendorbyproduct(obj:any, callback:any){
    this.product = this.http.post<any>(this.appvar.server+'/getvendorbyproduct',obj)
    this.product.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
}
