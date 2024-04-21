import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class BudgethistoryService {
obj: Observable<any>
  constructor(
    private http:HttpClient,
    private appvar:AppvarsService
  ) { }
  getHistories(obj,callback){
    this.obj = this.http.get(this.appvar.server+'/getbudgethistories/')
    this.obj.subscribe(
      data=>{
        console.log("gethistories success",data)
        callback(data)
      },
      err=>{
        console.log("gethistories failed",err)
        callback(err)
      }
    )
  }
  getHistoriesByFilter(obj,callback){
    this.obj = this.http.post(this.appvar.server+'/getbudgethistoriesbyfilter/',obj)
    this.obj.subscribe(
      data=>{
        console.log("getbudgethistoriesbyfilter success",data)
        callback(data)
      },
      err=>{
        console.log("getbudgethistoriesbyfilter failed",err)
        callback(err)
      }
    )
  }
}