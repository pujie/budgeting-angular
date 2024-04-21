import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  obj: Observable<any>
  constructor(
    private http: HttpClient,
    private appvar: AppvarsService
  ) { }
  getscityperiod(obj,callback){
    console.log("OBJ GETSCITYPERIOD",obj)
    this.obj = this.http.post(this.appvar.server+'/'+'getbudgetsbycityperiod',obj)
    this.obj.subscribe(
      data => {
        console.log("Appvar",data)
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getscityperiodbudgetlimitsum(obj,callback){
    console.log("OBJ GETSCITYPERIODSUM",obj)
    this.obj = this.http.post(this.appvar.server+'/'+'getbudgetscityperiodbudgetlimitsum',obj)
    this.obj.subscribe(
      data => {
        console.log("Appvar",data)
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  
  saveBudget(obj,callback){
    console.log("SaveBudget",obj)
    this.obj = this.http.post(this.appvar.server+'/budgetsave',obj)
    this.obj.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  saveBudgetHistory(obj,callback){
    console.log("SaveBudgetHistory",obj)
    this.obj = this.http.post(this.appvar.server+'/savebudgethistory',obj)
    this.obj.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  populateYear(){
    var d = new Date();
    var y = d.getFullYear();
    return [
      {value:(d.getFullYear()-1).toString(),viewValue:(d.getFullYear()-1).toString()},
      {value:d.getFullYear().toString(),viewValue:d.getFullYear().toString()},
      {value:(d.getFullYear()+1).toString(),viewValue:(d.getFullYear()+1).toString()},
      {value:(d.getFullYear()+2).toString(),viewValue:(d.getFullYear()+2).toString()}
    ]
  }
  recalculateplafon(callback){
    this.obj = this.http.get(this.appvar.server+'/recalculateplafon')
    this.obj.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  reCalculateBudget(callback){
    this.obj = this.http.get(this.appvar.server+'/recalculatebudget')
    this.obj.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  compareplafonpayments(obj,callback){
    console.log("SaveBudget",obj)
    this.obj = this.http.get(this.appvar.server+'/compareplafonpayments')
    this.obj.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }

}
