import { Injectable } from '@angular/core';
import { AppvarsService } from './appvars.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
private mail: Observable<any>
  constructor(private http: HttpClient,private appVar: AppvarsService) { }
  postMail(obj,callback){
    this.mail = this.http.post<any>(this.appVar.server+'/postmail',obj)
    this.mail.subscribe(
      data=>{
        console.log("postMail data",data)
        callback(data)
      },
      err=>{
        console.log("postMail err",err)
        callback(err)
      }
    )
  }
}
