import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlafonsService {
	plafon : Observable<any>=new Observable<any>

  constructor(
  	private http: HttpClient,
  	private appvar : AppvarsService,private datePipe: DatePipe
  ) { }
getQuarter(){
	let todayDate = new Date
	let todayMonth='1'
    todayMonth = this.datePipe.transform(todayDate, 'MM')!
    if (todayMonth>='1'&&todayMonth<='3') {
      return 1
    } else if (todayMonth>='4'&&todayMonth<='6') {
      return 2
    } else if (todayMonth>='7'&&todayMonth<='9') {
      return 3
    } else {
      return 4
    }
}
getYear(){
	let todayDate = new Date
	console.log("Taahun sistem",todayDate.getFullYear)
	return todayDate.getFullYear()
	//return this.datePipe.transform(todayDate, 'yyyy')
}
  getPlafons(callback:any){
  	this.plafon = this.http.get<any>(this.appvar.server+'/getplafons')
  	this.plafon.subscribe(
  		data => {
  			callback(data)
  		},
  		err => {
  			callback(err)
  		}
  	)
  }

  getPlafonsById(plafon_id:any, callback:any){
  	this.plafon = this.http.get<any>(this.appvar.server+'/getplafon/'+plafon_id)
  	this.plafon.subscribe(
  		data => {
  			callback(data[0])
  		},
  		err => {
  			callback(err[0])
  		}
  	)
  }
  getBudget(obj:any,callback:any){
	console.log("getBudget Obj",obj)
	this.plafon = this.http.get<any>(this.appvar.server+'/getbudget/'+obj.city_id+'/'+obj.year+'/'+obj.quarter+'/'+obj.division_id)
	this.plafon.subscribe(
		data => {
			console.log("getBudget are .. :",data)
			if(data.length>0){
				callback(data[0])
			}else{
				callback({budget_limit:0,budgetbeforeapprove:0,budgetUsed:0})
			}
		},
		err => {
			console.log("Error getBudget",err)
			callback(err[0])
		}
	)
  }
  getCityBudgetLimit(obj:any,callback:any){
	console.log("getcitybudget",obj)
	this.plafon = this.http.get<any>(this.appvar.server+'/getcitybudgetlimit/'+obj.city_id+'/'+obj.year+'/'+obj.quarter)
	this.plafon.subscribe(
		data => {
			if(data.length>0){
				callback(data[0])
			}else{
				callback({budget_limit:0,budgetbeforeapprove:0,budgetUsed:0})
			}
		},
		err => {
			callback(err[0])
		}
	)
  }
  savePlafon(plafon:any, callback:any){
	  console.log("Plafon",plafon)
  	this.plafon = this.http.post<any>(this.appvar.server+'/saveplafon', plafon)
  	this.plafon.subscribe(
  		data => {
        console.log('Save Plafon data', data)
  			callback(data)
  		},
  		err => {
        console.log('Save Plafon err', err)
  			callback(err)
  		}
  	)
  }

  updatePlafon(plafon:any, callback:any){
  	this.plafon = this.http.post<any>(this.appvar.server+'/updateplafon', plafon)
  	this.plafon.subscribe(
  		data => {
  			callback(data)
  		},
  		err => {
  			callback(err)
  		}
  	)
  }

  removePlafon(plafon:any, callback:any){
  	this.plafon = this.http.post<any>(this.appvar.server+'/removeplafon', plafon)
  	this.plafon.subscribe(
  		data => {
  			callback(data)
  		},
  		err => {
  			callback(err)
  		}
  	)
  }
}
