import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.component.html',
  styleUrls: ['./category-save.component.css']
})
export class CategorySaveComponent implements OnInit {
obj = {
  name:'',
  description:'',
  createuser:'anonymous'
}
  logindata;
  constructor(private category:CategoryService, private auth:AuthService, private router:Router) {
  this.auth.isLogin(result => {
      console.log("login",result)
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
    });
}
  saveCategory(obj){
    if(obj.name != '' && obj.description != ''){
      this.category.saveCategory(obj,result => {
        console.log("Success",result)
        this.router.navigate(['/categories']);
      })      
    }else{
      alert("Missing input value, please input value first!");
      console.log("Error! missing value")
    }
  }
  ngOnInit() {
  }

  clearInput(){
    this.obj.name = '';
    this.obj.description = '';
    alert("Input values has been reset!")
  }

}
