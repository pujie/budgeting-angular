import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MatDialog, MatIconRegistry } from '@angular/material';
import { UserChangepasswordComponent } from './user-changepassword/user-changepassword.component';
import { DomSanitizer } from '@angular/platform-browser';
import { RoleService } from './role.service';
import { AppvarsService } from './appvars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Padinet - Procurement';
  login=false;
  isPurchasingMember=false;
  hide_plafon=true;
  notadmin = false
  user = {
    id:localStorage.getItem('id'),
    name:localStorage.getItem('username'),
    email:localStorage.getItem('email'),
    level:localStorage.getItem('level')
  }
  roles = {
    submitter:1,
    approval1:2,
    approval2:3,
    approval3:4,
    approval4:5,
    purchase:6,
    admin:7,
    plafoncreator:8,
    realizationauth:9,
    submissionviewer:10,
    showbranchfilter:11,
    nego:12,
    warehouse:13,
    verifier:14
  }
  isSales = true
  isNotSales = false
  constructor(
    private auth : AuthService,
    private dialog:MatDialog,
    private icon:MatIconRegistry,
    private sanitizer:DomSanitizer,
    private roleService:RoleService,
    private appvarService: AppvarsService
  ){
    this.icon.addSvgIcon('search',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-search-24px.svg'))
    this.icon.addSvgIcon('usericon',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
    console.log('id',this.user.id)
    console.log(this.login)
    this.roleService.getRoleId(roles=>{
      console.log("Roles",roles)
    })
    this.auth.isMemberOf({user_id:this.user.id,role_id:this.roles.plafoncreator},res => {
      if(res.length>0){
        console.log("This user is a plafon creator")
        this.hide_plafon = false
      }else{
        console.log("This user is not a plafon creator")
        this.hide_plafon = true
      }
    })
    this.auth.isMemberOf({user_id:this.user.id,role_id:this.roles.purchase},res => {
      if(res.length>0){
        this.isPurchasingMember = false
      }else{
        this.isPurchasingMember = true
      }
    })
    this.auth.isMemberOf({user_id:this.user.id,role_id:this.roles.admin},res => {
      if(res.length>0){
        console.log("This user is a plafon creator")
        this.notadmin = false
      }else{
        console.log("This user is not a plafon creator")
        this.notadmin = true
      }
    })
    this.auth.isMemberOfDivision({user_id:this.user.id,division_id:1},res => {
      if(res[0].cnt>0){
        console.log("IS SALES TEAM MEMBER ......")
        this.isSales = true
        this.isNotSales = false
      }else{
        console.log("IS NOT SALES TEAM MEMBER ......")
        this.isSales = false
        this.isNotSales = true
      }
    })
  }
  logout(){
    this.auth.logout()
  }
  changePassword(){
    this.dialog.open(UserChangepasswordComponent,{
      data:{  
        title:'Change User Password'
      }
    })
  }
  toolbarLogin(login:boolean){
    this.login=login;
  }
  setPurchasingMember(isPurchasingMember:boolean){
    if(isPurchasingMember){
      console.log('isPurchasingMember invoked')
    }else{
      console.log('is not Purchasing Member')
    }
    this.isPurchasingMember=isPurchasingMember;
  }
  downloadManual(){
    //window.location.href = "http://budgeting.padinet.com/Purchasing.pdf"
    window.open("http://budgeting.padinet.com/Purchasing.pdf","_blank")
  }
  showServer(){
    alert("Server"+this.appvarService.server)
  }
  showUserManager(){
    window.location.href = '/usman'
  }
}
