import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class PurchasehistoryService {
history : Observable<any> = new Observable<any>
histories : Observable<any[]> = new Observable<any>

  constructor(private http: HttpClient,private appvar : AppvarsService) {}

  getPurchaseHistoryBySubmission(obj:any,callback:any){
    this.history = this.http.post<any>(this.appvar.server+'/getpurchasehistorybysubmission',obj)
    this.history.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getPurchaseHistory(obj:any,callback:any){
    this.history = this.http.post<any>(this.appvar.server+'/getpurchasehistory',obj)
    this.history.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  savePurchaseHistory(obj:any,callback:any){
    this.history = this.http.post<any>(this.appvar.server+'/savepurchasehistory',obj)
    this.history.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  submissionDetailFromPurchaseHistory(callback:any){
    this.history = this.http.get<any>(this.appvar.server+'/submissiondetailfrompurchasehistory')
    this.history.subscribe(
      data => {
        console.log(data)
        callback(data)
      },
      err => {
        console.log(err)
        callback(err)
      }
    )
  }
  updatePurchaseHistory(obj:any,callback:any){
    this.history = this.http.post<any>(this.appvar.server+'/updatepurchasehistory',obj)
    this.history.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
}
