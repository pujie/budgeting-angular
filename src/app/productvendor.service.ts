import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class ProductvendorService {
	productVendor  : Observable<any> = new Observable<any>
	productVendors : Observable<any[]> = new Observable<any>
  	constructor(
  		private http: HttpClient,
  		private appvar : AppvarsService
  	) { }
  	associateProductVendor(obj:any, callback:any){
		console.log("OBJ when associated product vendor",obj)
  		this.productVendor = this.http.post<any>(this.appvar.server+'/associate_product_vendor', obj)
  		this.productVendor.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}
	disassociateProductsByVendor(obj:any, callback:any){
		this.productVendor = this.http.post<any>(this.appvar.server+'/disassociateproductsbyvendor',obj)
		this.productVendor.subscribe(
			data => {
				callback(data)
			},
			err => {
				console.log("Error dissacoiated product vendor",err)
				callback(err)
			}
		)
	}
	disassociateVendorsByProduct(obj:any, callback:any){
		this.productVendor = this.http.post<any>(this.appvar.server+'/disassociatevendorsbyproduct',obj)
		this.productVendor.subscribe(
			data => {
				callback(data)
			},
			err => {
				callback(err)
			}
		)
	}
  	disassociateProductVendor(obj:any, callback:any){
  		this.productVendor = this.http.post<any>(this.appvar.server+'/disassociate_product_vendor', obj)
  		this.productVendor.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}
  	getProductByVendor(obj:any, callback:any){
  		this.productVendors = this.http.post<any[]>(this.appvar.server+'/getproductbyvendor', obj)
  		this.productVendors.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}
  	getVendorByProduct(obj:any, callback:any){
  		this.productVendors = this.http.post<any[]>(this.appvar.server+'/getvendorbyproduct', obj)
  		this.productVendors.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}
    removeAllAssociatedVendors(obj:any, callback:any){
      this.productVendor = this.http.get<any>(this.appvar.server+'/removeallassociatedvendors/'+obj.id)
      this.productVendor.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    removeAllAssociatedProducts(obj:any, callback:any){
      this.productVendor = this.http.get<any>(this.appvar.server+'/removeallassociatedproducts/'+obj.id)
      this.productVendor.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
	}
	updatePrice(obj:any, callback:any){
		this.productVendors = this.http.post<any[]>(this.appvar.server+'/updateprice', obj)
		this.productVendors.subscribe(
			data => {
				callback(data)
			},
			err => {
				callback(err)
			}
		)
	}
}
