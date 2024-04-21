import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {
obj:Observable<any>
  constructor(private http: HttpClient, private appvar:AppvarsService) { }
  getDivisions(callback){
    this.obj = this.http.get(this.appvar.server+'/getdivisions')
    this.obj.subscribe(
      data=>{
        console.log("RESULT OF DIVISION GETS",data)
        callback(data)
      },
      err=>{
        console.log("ERROR OF DIVISION GETS",err)
        callback(err)
      }
    )
  }
}
