import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from './appvars.service';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  imageToShow:any
  user:Observable<any> = new Observable<any>
  userImage:Observable<Blob> = new Observable<Blob>
  constructor(private http:HttpClient,private appServ:AppvarsService,private sanitizer:DomSanitizer) { }
  role = {
    'submitter':1,
    'approval1':2,
    'approval2':3,
    'approval3':4,
    'approval4':5,
    'purchase':6,
    'admin':7,
    'plafoncreator':8,
    'realizationauth':9,
    'submissionviewer':10,
    'showbranchfilter':11,
    'verifier':14
  }
  update(obj:any,callback:any){
    console.log('user service invoked',obj)
    this.user = this.http.post(this.appServ.server+'/updateuser',obj)
    this.user.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getuser(obj:any,callback:any){
    this.user = this.http.post(this.appServ.server+'/getuser',obj)
    console.log('getuser invoked',obj.id)
    this.user.subscribe(
      data=>{
        console.log('Data',data[0])
        callback(data[0])
      },
      err=>{
        console.log('Err',err)
        callback(err)
      },
      ()=>{
        console.log('Complete')
      }
    )
  }
  getImage(obj:any,callback:any){
    this.userImage = this.http.get(this.appServ.server+'/getuserimage/'+obj.id,{responseType:'blob'})
    this.userImage.subscribe(
      data => {
        console.log('GetImage Data',data)
        callback(data)
      },
      err => {
        console.log('GetImage Err',err)
        callback(err)
      },
      ()=>{
        console.log('GetImage COmpleted')
      }
    )
  }

  getDivisionsByUserId(userId:any, callback:any){
      this.user = this.http.get<any>(this.appServ.server+'/getdivisionsbyuserid/'+userId)
      this.user.subscribe( 
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
  }

  getUsersByDivisionId(divisionId:any, callback:any){
      this.user = this.http.get<any>(this.appServ.server+'/getusersbydivisionid/'+divisionId)
      this.user.subscribe( 
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
  }

  getuserByName(name:any, callback:any){
      this.user = this.http.get<any>(this.appServ.server+'/getuserbyname/'+name)
      this.user.subscribe( 
        data => {
          callback(data)
        },
        err => {
          callback(err)
        }
      )
  }
  checkRole(obj:any,callback:any){
    this.user = this.http.get(this.appServ.server+'/checkrole/'+obj.user_id+'/'+obj.role_id)
    this.user.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getRoles(obj:any,callback:any){
    this.user = this.http.get(this.appServ.server+'/getuserrole/'+obj.user_id)
    this.user.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getUsers(callback:any){
    this.user = this.http.get(this.appServ.server+'/getusers')
    this.user.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
}
