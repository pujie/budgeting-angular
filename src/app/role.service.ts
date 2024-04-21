import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service'

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  obj: Observable<any> = new Observable<any>
  constructor(private http: HttpClient,private appvar: AppvarsService) { }
  getRoleMail(obj:any,callback:any){
    this.obj = this.http.get(this.appvar.server+'/getroleemail/'+obj.identifier)
    this.obj.subscribe(
      data=>{
        console.log("Res getRoleEmail",data)
        callback(data)
      },err=>{
        console.log("Err getRoleEmail",err)
        callback(err)
      }
    )
  }
  getRoleMails(obj:any,callback:any){
    this.obj = this.http.get(this.appvar.server+'/getroleemails/'+obj.identifier)
    this.obj.subscribe(
      data=>{
        console.log("Res getRoleEmail",data)
        callback(data)
      },err=>{
        console.log("Err getRoleEmail",err)
        callback(err)
      }
    )
  }
  getRolesEmails(obj:any,callback:any){
    this.obj = this.http.post(this.appvar.server+'/getrolesemails',obj)
    this.obj.subscribe(
      data => {
        console.log('success getRolesEmails',data)
        callback(data)
      },
      err=>{
        console.log('Failed getRolesEmails',err)
        callback(err)
      }
    )
  }
  getRole(obj:any,callback:any){

  }
  getRoleMembers(obj:any,callback:any){
    this.obj = this.http.get(this.appvar.server+'/getrolemembers/'+obj.identifier)
    this.obj.subscribe(
      data=>{
        console.log("Res getRoleMember",data)
        callback(data)
      },err=>{
        console.log("Err getRoleMember",err)
        callback(err)
      }
    )
  }
  getRoles(callback:any){
    this.obj = this.http.get(this.appvar.server+'/getroles/')
    this.obj.subscribe(
      data=>{
        console.log("Res getRoles",data)
        callback(data)
      },err=>{
        console.log("Err getRoles",err)
        callback(err)
      }
    )
  }
  getRoleId(callback:any){
    let out : any[] = []
    this.getRoles((roles:any)=>{
      console.log("getRoles",roles)
      let x= (
        roles.map((role:any)=>{
          out[role.name]=role.id
        })
      )
      callback(out)
    })
  }
}
