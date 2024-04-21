import { Component, OnInit, Directive, Attribute, Input } from '@angular/core';
import { VendorService } from '../vendor.service';
import { FormControl, Validators, AbstractControl, Validator, ValidatorFn  } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; 
import { ImageService } from '../image.service';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-vendor-save',
  templateUrl: './vendor-save.component.html',
  styleUrls: ['./vendor-save.component.css']
})
export class VendorSaveComponent implements OnInit {
  vendor = {
    namecard:'',
    offeringsample:'',
    invoicesample:'',
    receiptsample:'',
  	name:'',
  	address:'',
  	phone:'',
  	bankaccount:'',
  	createuser:''
  }
  logindata:any;
  constructor(
    private vendorService:VendorService, 
    private auth:AuthService, 
    private router:Router,
    private imageService:ImageService,
    private commonService: CommonService
  ) {
    this.vendor.bankaccount='0'
    this.auth.isLogin((result:any) => {
        console.log("login",result)
        this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
          this.router.navigate(['/login']);
        }
      });
  }
  // namecard(event) {
  //   let canvas = document.createElement('canvas')
  //   this.vendor.namecard = canvas.toDataURL(event.srcElement.value)
  //       console.log("event",this.vendor.namecard)    
  //   this.imageService.loadImage1(event, 300, result=>{
  //     document.getElementById('namecard').setAttribute('src',result)
  //   })  
  // }

  // offeringsample(event) {
  //   let canvas = document.createElement('canvas')
  //   this.vendor.offeringsample = canvas.toDataURL(event.srcElement.value)
  //   this.imageService.loadImage1(event, 300, result=>{
  //     document.getElementById('offeringsample').setAttribute('src',result)
  //   })  
  // }

  // invoicesample(event) {
  //   let canvas = document.createElement('canvas')
  //   this.vendor.invoicesample = canvas.toDataURL(event.srcElement.value)
  //   this.imageService.loadImage1(event, 300, result=>{
  //     document.getElementById('invoicesample').setAttribute('src',result)
  //   })  
  // }

  // receiptsample(event) {
  //   let canvas = document.createElement('canvas')
  //   this.vendor.receiptsample = canvas.toDataURL(event.srcElement.value)
  //   this.imageService.loadImage1(event, 300, result=>{
  //     document.getElementById('receiptsample').setAttribute('src',result)
  //   })  
  // }
  sanitizeVendor(obj:any,callback:any){
    callback({
      name:this.commonService.sanitizeString(obj.name),
      address:this.commonService.sanitizeString(obj.address),
      phone:this.commonService.sanitizeString(obj.phone),
      bankaccount:this.commonService.sanitizeString(obj.bankaccount)
    })
  }
  saveVendor(vendor:any){
    this.vendor.createuser = this.logindata.name
    if(vendor.name != '' && vendor.address != '' && vendor.phone != ''){
      this.sanitizeVendor(vendor,(vendor:any)=>{
        this.vendorService.saveVendor(vendor, (result:any) => {
          console.log("Success", result)
          this.router.navigate(['/vendor']);
        })
      })
    }else{
      alert("Missing input value, please input value first!");
    }
  }
  clearInput(){
    this.vendor.name = '';
    this.vendor.address = '';
    this.vendor.phone = '';
    this.vendor.bankaccount = '0';
    alert("Input values has been reset!")
  }
  ngOnInit() {
  }
  numCheck(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  bankNull(data:any){
    if (data==null || data==undefined || data=='') {
      this.vendor.bankaccount = '0'
    }
  }
  changeFocus(event:any, newFocus:any){
    if(event.key === "Enter"){
      newFocus.focus()
    }
  }
}