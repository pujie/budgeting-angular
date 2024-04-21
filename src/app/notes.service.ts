import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private obj: Observable<any>
  constructor(
    private http: HttpClient,
    private appvar: AppvarsService,
  ) { }
  getBySubmissionId(obj,callback){
    this.obj = this.http.get(this.appvar.server+'/getNotesBySubmissionId/'+obj.submission_id)
    this.obj.subscribe(
      data=>{
        console.log("success retrieve notes",data)
        callback(data)
      },
      err=>{
        console.log("error retrieve notes",err)
        callback(err)
      }
    )
  }
  addNote(obj,callback){
    this.obj = this.http.post(this.appvar.server+'/addnote',obj)
    this.obj.subscribe(
      data=>{
        console.log("success insert notes",data)
        callback(data)
      },
      err=>{
        console.log("error insert notes",err)
        callback(err)
      }
    )
  }
}
