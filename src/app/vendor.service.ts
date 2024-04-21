import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
	vendor  : Observable<any> = new Observable<any>
	vendors : Observable<any[]> = new Observable<any[]>
  vendorImage:Observable<Blob> = new Observable<Blob>
  	constructor(private http: HttpClient,private appvar : AppvarsService) { }

  	getVendors(callback:any){
  		this.vendors = this.http.get<any[]>(this.appvar.server+'/getvendors')
  		this.vendors.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}
  	getVendornames(callback:any){
  		this.vendors = this.http.get<any[]>(this.appvar.server+'/getvendornames')
  		this.vendors.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	getVendor(obj:any, callback:any){
  		this.vendor = this.http.get<any>(this.appvar.server+'/getvendor/'+obj.id)
  		this.vendor.subscribe(
  			data => {
  				callback(data[0])
  			},
 			  err => {
 				  callback(err)
 			  }
  		)
  	}

  	saveVendor(obj:any, callback:any){
  		this.vendor = this.http.post<any>(this.appvar.server+'/savevendor', obj)
  		this.vendor.subscribe(
  			data => {
  				callback(data)
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}

  	updateVendor(obj:any, callback:any){
  		this.vendor = this.http.post<any>(this.appvar.server+'/updatevendor', obj)
  		this.vendor.subscribe(
  			data => {
  				callback(data[0])
  			},
  			err => {
  				callback(err)
  			}
  		)
  	}
    updatevendorimage(obj:any,callback:any){
      this.vendor = this.http.post<any>(this.appvar.server+'/updatevendorimage',obj)
      this.vendor.subscribe(
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
    }
    setStatusVendor(obj:any,callback:any){
    this.vendor = this.http.get<any>(this.appvar.server+'/setvendoractive/'+obj.id+'/'+obj.status)
    this.vendor.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  getproductsbyvendor(obj:any,callback:any){
    this.vendor = this.http.post<any[]>(this.appvar.server+'/getproductbyvendor',obj)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )

  }
  getVendorPage(obj:any,callback:any){
    this.vendor = this.http.get<any[]>(this.appvar.server+'/getvendorpage/'+obj.pageIndex+'/'+obj.pageSize)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  // getVendorPage1(obj,callback){
  //   this.vendor = this.http.get<any[]>(this.appvar.server+'/getvendorpage/'+obj.pageIndex+'/'+obj.pageSize,{responseType:'blob'})
  //   this.vendor.subscribe(
  //     data => {
  //       console.log("data",data)
  //       callback(data)
  //     },
  //     err => {
  //       callback(err)
  //     }
  //   )
  // }

  getVendorCount(callback:any){
    this.vendor = this.http.get<any>(this.appvar.server+'/getvendorcount')
    this.vendor.subscribe(
      data => {
        callback(data[0].cnt)
      },
      err => {
        callback(err)
      }
    )
  }

  searchVendor(obj:any,callback:any){
    this.vendor = this.http.post<any[]>(this.appvar.server+'/searchvendor',obj)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  searchVendorCount(obj:any,callback:any){
    this.vendor = this.http.post<any>(this.appvar.server+'/searchvendorcount',obj)
    this.vendor.subscribe(
      data => {
        callback(data[0].cnt)
      },
      err => {
        callback(err)
      }
    )
  }
//this.userImage = this.http.get(this.appServ.server+'/getuserimage/'+obj.id,{responseType:'blob'})
  getvendorimage(obj:any,callback:any){
    console.log("Vendor OBJ",obj)
    this.vendorImage = this.http.get(this.appvar.server+'/getvendorimage/'+obj.id+'/'+obj.imagetype,{responseType:'blob'})
    this.vendorImage.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  //for vendor PIC's
  getVendorPics(vendorId:any, callback:any){
    this.vendor = this.http.get<any>(this.appvar.server+'/getvendorpics/'+vendorId)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  saveVendorPic(vendorPic:any, callback:any){
    this.vendor = this.http.post<any>(this.appvar.server+'/savevendorpic', vendorPic)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  updateVendorPic(vendorPic:any, callback:any){
    this.vendor = this.http.post<any>(this.appvar.server+'/updatevendorpic', vendorPic)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

  deleteVendorPic(picId:any, callback:any){
    this.vendor = this.http.get<any>(this.appvar.server+'/deletevendorpic/'+picId)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  removesubmissiondetailvendor(obj:any,callback:any){
    this.vendor = this.http.post<any>(this.appvar.server+'/removesubmissiondetailvendor', obj)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  saveSubmissionDetailVendor(obj:any,callback:any){
    console.log("OBJ to save",obj)
    this.vendor = this.http.post<any>(this.appvar.server+'/savesubmissiondetailvendor', obj)
    this.vendor.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
}
