import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
import { PadiDateAdapter } from '../submission-edit/submission-edit.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email:'',
    password:''
  }
  logindata
  correct=true;
  pass_at = false
  constructor(private auth:AuthService, private appcomponent:AppComponent,private el:ElementRef) {
    this.appcomponent.toolbarLogin(true)
        this.correct=true;
   }
  doLogin(){
    console.log("pass",this.user)
    this.auth.login(this.user,(result,obj,message) => {
      if(result){
        window.location.href = obj.defaultRoute
        this.correct=true;
      }else{
        console.log("Login Failed",message)
        this.correct=false;
      }
    })
  }
  login(event){
    if(event.key === 'Enter'){
      this.doLogin()
    }
  }
  highlightDomain(){
    const myel = this.el.nativeElement.querySelector('#useremail');
    console.log("MyEl",myel)
    myel.focus()
    myel.setSelectionRange(3,5)
    console.log("@ typed")
  }
  highlightDomain2(start,textLength){
    const myel = this.el.nativeElement.querySelector('#useremail');
    console.log("Start",start)
    myel.focus()
    myel.setSelectionRange(start,textLength)
  }
  emailGotFocus(){
    this.highlightDomain2(1,this.user.email.length)
  }
  changeToPass(event, newFocus){
    console.log("TextLength",this.user.email.length)
    let _textLength = this.user.email.length
    let textLength = 0
    switch(event.key){
      case   "Enter":
        newFocus.focus()
        this.highlightDomain()
      break
      case "@":
        this.user.email+="padi.net.id"
        this.pass_at = true
        textLength = this.user.email.length
        setTimeout(res=>{
          this.highlightDomain2(_textLength,textLength)
        },100)
      break
    }    
  }
  setSelection(){
    let nativeEl: HTMLInputElement = this.el.nativeElement.querySelector('input');
    console.log("AAA")
    if (nativeEl) {
      console.log("BBB")
      if (nativeEl.setSelectionRange) {
        console.log("CCC")
        // select the text from start to end
        //return nativeEl.setSelectionRange(0, nativeEl.value.length);
      }

      nativeEl.select();
    }
  }
  onFocus(){
    //let inputRef: HTMLInputElement = this.el.nativeElement.querySelector('input');
    //const myel = <HTMLInputElement>document.getElementById("useremail"); 
    const myel = this.el.nativeElement.querySelector('#useremail');
    //let length = inputRef.value.length;
//console.log("inputRef Length",inputRef,length)
   // if(length > 3){
     console.log("OnFocus invoked")
     myel.focus()
     myel.setSelectionRange(3,5)
   // }
   // else{
  //      inputRef.select();
  //  }
}
  ngOnInit() {
  }
}