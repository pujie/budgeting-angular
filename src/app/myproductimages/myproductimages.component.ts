import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from '../appvars.service';
import { ImageService } from '../image.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-myproductimages',
  templateUrl: './myproductimages.component.html',
  styleUrls: ['./myproductimages.component.css']
})
export class MyproductimagesComponent implements OnInit {
myobj : Observable<any>
productImages

  constructor(
    private http:HttpClient,
    private appvar:AppvarsService,
    private imageService: ImageService
  ) {
    //this.getpic()
  }
  ngOnInit() {
    this.getpic()
  }
  getpic(){
    this.myobj = this.http.get(this.appvar.server+'/getproductimages/28')
    this.myobj.subscribe(
      data => {
        console.log("Success retrieve product image",data)
        this.productImages = data
        for(let index in data){
          console.log("dataindeximage",data[index].image)
          var byteArray = new Uint8Array(data[index].image.data);
          var blob = new Blob([byteArray], { type: 'image/jpeg' });
          this.imageService.createImageFromBlob(blob,result => {
            console.log("Image Result",result)
            document.getElementById(data[index].id).setAttribute('src',result)
            this.productImages.image = result
            console.log("productImagesImage",this.productImages.image)
          })  
        }
      },
      err => {
        console.log("Error retrieve product image",err)
      }
    )

  }
}
