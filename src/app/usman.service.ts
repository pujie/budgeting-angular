import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class UsmanService {
obj:Observable<any> = new Observable<any>
  constructor(
    private http: HttpClient,
    private appvar: AppvarsService
  ) {
  }
  getUsersRoles(callback:any){
    this.obj = this.http.get(this.appvar.server+'/getusersbyroles')
    this.obj.subscribe(
      success=>{
        console.log('success',success)
        callback(success)
      },
      fail=>{
        console.log('Fail',fail)
        callback(fail)
      }
    )

  }
}
