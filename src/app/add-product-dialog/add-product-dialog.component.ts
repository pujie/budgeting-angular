import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
category
products
product
price
  constructor(
    private dialogRef:MatDialogRef<AddProductDialogComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    console.log("Data retrieved",data)
    this.category = this.convertCategory(data.category_id)
    this.productService.getProductByCategory({category_id:data.category_id},res => {
      console.log("products in this category",res)
      this.products = res
    })
  }
  convertCategory(category_id){
    switch(category_id){
      case 10:
        this.category = 'BTS'
      break
      case 11:
        this.category = 'Teknis (Office)'
       break
      case 12:
        this.category = 'Non Teknis'
        break
      case 13:
        this.category = 'Kendaraan'
        break
      }
      console.log("This category",this.category)
      return this.category
  }
  ngOnInit() {
  }
  associateProductVendor(){
    this.dialogRef.close({
      canceled:false,
      product:this.product,
      price:this.price
    })
  }
  closeDialog(){
    this.dialogRef.close({canceled:true})
  }
}
