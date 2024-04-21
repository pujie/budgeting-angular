import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppvarsService } from '../appvars.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-testgetvendor',
  templateUrl: './testgetvendor.component.html',
  styleUrls: ['./testgetvendor.component.css']
})
export class TestgetvendorComponent implements OnInit {
  obj: Observable<any>
  myobj = {
    address:'',
    bankaccount:'',
    id:0
  }
  constructor(private http:HttpClient,private appvar:AppvarsService,private imageService:ImageService) {
    this.obj = this.http.get(this.appvar.server+'/getvendor/4')
    this.obj.subscribe(
      data => {
        console.log("Data retrieved",data)
        this.myobj = data[0]



        var byteArray = new Uint8Array(data[0].namecard.data);
        var blob = new Blob([byteArray], { type: 'image/jpeg' });
        this.imageService.createImageFromBlob(blob,(result:any) => {
          console.log("Image Result",result)
          document.getElementById("namecard")!.setAttribute('src',result)
          //this.productImages.image = result
          //console.log("productImagesImage",this.productImages.image)
        })  


      },
      err => {
        console.log("error retrieved",err)
      }
    )

  }

  ngOnInit() {
  }

}
