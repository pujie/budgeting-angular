import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { ImageService } from '../image.service';
@Component({
  selector: 'app-add-vendor-image-dialog',
  templateUrl: './add-vendor-image-dialog.component.html',
  styleUrls: ['./add-vendor-image-dialog.component.css']
})
export class AddVendorImageDialogComponent implements OnInit {
obj = {
  name:'Hello'
}
  constructor(
    @Inject (MAT_DIALOG_DATA) public data:any,
    private imageService: ImageService,
    private dialogRef: MatDialogRef<AddVendorImageDialogComponent>
    ) {
      this.obj = this.data
    }
  showInputDialog(){
    document.getElementById('uplComponent').click()
  }
  ngOnInit() {
  }
  uploadFile($event){
    this.imageService.loadImage1(event,1080,result=>{
      document.getElementById('profileImage').setAttribute('src',result)
    })
  }
  updatevendorimage(){
    console.log("ImageType",this.data)
    this.dialogRef.close({
      image:document.getElementById('profileImage').getAttribute('src'),
      imageType:this.data.imageType,
      vendor_id:this.data.vendor_id
    })
  }
}
