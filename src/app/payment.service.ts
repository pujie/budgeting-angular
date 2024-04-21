import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
payment : Observable<any> = new  Observable<any>
payments : Observable<any[]> = new  Observable<any[]>

  constructor(private http: HttpClient,private appvar : AppvarsService) {}
  getPayment(obj:any,callback:any){
    this.payments = this.http.post<any>(this.appvar.server+'/getpayment',obj)
    this.payments.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getPayments(callback:any){
    this.payments = this.http.get<any[]>(this.appvar.server+'/getpayments')
    this.payments.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getPaymentBySubmissionId(obj:any,callback:any){
    this.payments = this.http.post<any>(this.appvar.server+'/getpaymentsbysubmissionid',obj)
    this.payments.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getPaymentsBySubmissionDetailId(obj:any,callback:any){
    this.payment = this.http.post<any>(this.appvar.server+'/getPaymentsBySubmissionDetailId',obj)
    this.payment.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  savePayment(obj:any,callback:any){
    this.payment = this.http.post<any>(this.appvar.server+'/savepayment',obj)
    this.payment.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }

  updatePayment(obj:any,callback:any){
    this.payment = this.http.post<any>(this.appvar.server+'/updatepayment',obj)
    this.payment.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
}
