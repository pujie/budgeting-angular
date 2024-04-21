import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorComponent } from '../vendor/vendor.component';
import { VendorService } from '../vendor.service';
import { ImageService } from '../image.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-vendor-image',
  templateUrl: './vendor-image.component.html',
  styleUrls: ['./vendor-image.component.css']
})
export class VendorImageComponent implements OnInit {
obj = {
  id:'',
  name:'',
  address:'',
  bankaccount:'',
  namecard:'',
  offeringsample:'',
  invoicesample:'',
  receiptsample:''
}
imageparam = {
  imagetype:'',
  image:'',
  id:0
}
imagetype
  constructor(private route:ActivatedRoute, private location: Location, private vendor:VendorService,private imageService : ImageService) {
    this.obj.id = this.route.snapshot.params['id']
    this.imageparam.id = this.route.snapshot.params['id']
    this.imagetype = this.route.snapshot.params['imagetype']

    this.vendor.getVendor({id:this.obj.id},(result:any) => {
      this.obj = result
    })

    this.vendor.getvendorimage({id:this.obj.id,imagetype:this.imagetype},(result:any) => {
      console.log('Vendor',result)
      this.imageService.createImageFromBlob(result, (image:any) => {
        console.log('result',result)
        console.log('blob',image)
        if (image!='') {
          document.getElementById('profileImage')!.setAttribute('src',image)
        }
      })
    })
  }

  ngOnInit() {
  }

  backToLastPage() {
    this.location.back();
  }

  showInputDialog(){
    document.getElementById('uplComponent')!.click()
  }

  uploadFile(event:any){
    this.imageService.loadImage1(event,1080,(result:any)=>{
      document.getElementById('profileImage')!.setAttribute('src',result)
    })
  }

  updatevendorimage(){
    switch(this.imagetype){
      case 'namecard':
      this.imageparam.imagetype = 'namecard'
      this.imageparam.image = document.getElementById('profileImage')!.getAttribute('src')!
      break
      case 'offeringsample':
      this.imageparam.imagetype = 'offeringsample'
      this.imageparam.image = document.getElementById('profileImage')!.getAttribute('src')!
      break;
      case 'invoicesample':
      this.imageparam.imagetype = 'invoicesample'
      this.imageparam.image = document.getElementById('profileImage')!.getAttribute('src')!
      break
      case 'receiptsample':
      this.imageparam.imagetype = 'receiptsample'
      this.imageparam.image = document.getElementById('profileImage')!.getAttribute('src')!
      break
    }
    this.vendor.updatevendorimage(
      this.imageparam,(result:any)=>{
      console.log('sukses update',result)
    })
  }
//  updatevendorimage(){}
}
