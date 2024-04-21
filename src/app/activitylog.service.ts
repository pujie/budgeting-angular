import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitylogService {
  obj:Observable<any>
  constructor(
    private http:HttpClient,
    private appvar:AppvarsService
  ) { }
  create(obj,callback){
    this.obj = this.http.post(this.appvar.server+'/createlog',obj)
    this.obj.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  gets(callback){
    this.obj = this.http.get(this.appvar.server+'/getlogs')
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
