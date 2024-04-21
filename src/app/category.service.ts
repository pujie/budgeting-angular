import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppvarsService } from './appvars.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
category : Observable<any>
categories : Observable<any[]>
  constructor(private http: HttpClient, private appvar : AppvarsService) {}
  getCategories(callback){
    this.categories = this.http.get<any[]>(this.appvar.server+'/getcategories')
    this.categories.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getCategory(obj,callback){
    this.category = this.http.get<any>(this.appvar.server+'/getcategory/'+obj.id)
    this.category.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  getCategorypage(obj,callback){
    this.categories = this.http.get<any[]>(this.appvar.server+'/getCategorypage/'+obj.pageIndex+'/'+obj.pageSize)
    this.categories.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  getCategoryCount(callback){
    this.category = this.http.get<any>(this.appvar.server+'/getcategorycount')
    this.category.subscribe(
      data => {
        callback(data[0].cnt)
      },
      err => {
        callback(err)
      }
    )
  }
  searchCategory(obj,callback){
    this.category = this.http.post<any[]>(this.appvar.server+'/searchcategory',obj)
    this.category.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
  searchCategoryCount(obj,callback){
    this.category = this.http.post<any>(this.appvar.server+'/searchcategorycount',obj)
    this.category.subscribe(
      data => {
        callback(data[0].cnt)
      },
      err => {
        callback(err)
      }
    )
  }
  saveCategory(obj,callback){
    this.category = this.http.post<any>(this.appvar.server+'/savecategory',obj)
    this.category.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  updateCategory(obj,callback){
    this.category = this.http.post<any>(this.appvar.server+'/updatecategory',obj)
    this.category.subscribe(
      data => {
        callback(data[0])
      },
      err => {
        callback(err)
      }
    )
  }
  removeCategory(obj,callback){
    this.category = this.http.get<any>(this.appvar.server+'/setcategoryactive/'+obj.id+'/'+obj.status)
    this.category.subscribe(
      data => {
        callback(data)
      },
      err => {
        callback(err)
      }
    )
  }
}
