import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppvarsService } from './appvars.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  obs : Observable<any>
  constructor(private http: HttpClient, private appvar: AppvarsService) { }
  doGet(obj,callback){
    console.log('doGet OBJ',obj)
    this.obs = this.http.get(this.appvar.server+obj.url)
    this.obs.subscribe(
      data=>{
        console.log('doGet data',data)
        callback(data)},
      err=>{
        console.log('doGet err',err)
        callback(err)
      }
    )
  }
  doPost(obj,callback){
    this.obs = this.http.post(this.appvar.server+obj.url,obj.options)
    this.obs.subscribe(
      data=>{callback(data)},
      err=>{callback(err)}
    )
  }
}
