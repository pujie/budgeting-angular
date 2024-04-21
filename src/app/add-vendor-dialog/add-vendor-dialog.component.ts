import { Component, OnInit, Inject } from '@angular/core';
import { VendorService } from '../vendor.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vendor-dialog',
  templateUrl: './add-vendor-dialog.component.html',
  styleUrls: ['./add-vendor-dialog.component.css']
})
export class AddVendorDialogComponent implements OnInit {
  vendors
  vendor
  price
  saveLabel
  cprice = new FormControl('', [
    Validators.required,
  ]);
  cvendor = new FormControl('', [
    Validators.required,
  ]);
  constructor(
    private vendorService:VendorService,
    private dialogRef: MatDialogRef<AddVendorDialogComponent>,
    @Inject (MAT_DIALOG_DATA) private data:any
  ) {
    console.log("Data",data)
    this.vendorService.getVendornames(res => {
      this.vendors = res
      if(data.isEdit){
        console.log("Edit Vendo",data.vendorId)
        this.vendor = data.vendorId
        this.price = data.vendorPrice
        this.saveLabel = "Update Price"
      }else{
        this.saveLabel = "Add vendor"
      }
      })
}
  addFieldValue(){
    if(this.cprice.valid && this.cvendor.valid){
      this.dialogRef.close({
        vendor_id:this.vendor,
        price:this.price,
        canceled:false
      })
    }
  }
  closeDialog(){
    this.dialogRef.close({canceled:true})
  }
  ngOnInit() {
  }
}
