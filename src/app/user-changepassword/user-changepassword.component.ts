import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-changepassword',
  templateUrl: './user-changepassword.component.html',
  styleUrls: ['./user-changepassword.component.css']
})
export class UserChangepasswordComponent implements OnInit {
  user = {
    email:'',
    password: '',
    passwordconfirmation:''
  }
  constructor(private auth:AuthService) {
    this.auth.isLogin((result:any,obj:any) =>{
      console.log("Is Login Result",result)
      console.log("Obj",obj)
    })
  }
  ngOnInit() {
  }
  doChangePassword(){
    this.auth.updatePassword({email:localStorage.getItem('email'),newpassword:this.user.password},(result:any) => {
      console.log("Update password",result)
    })
  }
}
