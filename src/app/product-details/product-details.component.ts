import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { VendorService } from '../vendor.service';
import { ProductService } from '../product.service';
import { ProductvendorService } from '../productvendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { ImageService } from '../image.service';
//import { $ } from 'protractor';
import { AddVendorDialogComponent } from '../add-vendor-dialog/add-vendor-dialog.component';

export interface DialogData {
  id: Number;
  imageId: Number;
  status: Number;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name', 'address', 'phone', 'price','action']
	logindata:any;
	obj;
  product:any;
  productImages:any;
  product_id
  vendorsToDisplay=new Array();
  vendorsresult:any;
  dataSource:any;

  //Variables for paginator
  length = 100
  pageSize = 10
  pageSizeOptions : number[] = [5,10,25]
  curPageSize=10
  curIndex=0

  constructor(
  	private vendorService: VendorService,
  	private categoryService: CategoryService,
  	private productService: ProductService,
  	private productvendorService: ProductvendorService,
    private imageService: ImageService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private auth: AuthService,
  	private icon: MatIconRegistry,
    public dialog: MatDialog,
  	private sanitizer: DomSanitizer
  ) { 
    const selectedId = +this.route.snapshot.paramMap.get('id')!
    this.product_id = this.route.snapshot.paramMap.get("id")!
  	this.auth.isLogin((result:any) => {
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
      this.icon.addSvgIcon('usericon',sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
    });

    this.obj = {
        id:selectedId,
        name:'',
        partnumber:'',
        unit:'',
        createuser:'',
        category_name:'',
      }

    this.productService.getProduct(this.obj, (result:any) => {
      this.obj.name = result.name
      this.obj.partnumber = result.partnumber
      this.obj.unit = result.unit
      this.obj.createuser = result.createuser

      this.curPageSize = this.pageSize
      this.curIndex = this.curIndex
      //this.getAllAssociatedVendors(result.id)
      this.reloadVendors()
      this.categoryService.getCategory({id: result.category_id}, (result:any) => {
        if(result != null){
          this.obj.category_name = result.name
        }
      });

    })
    this.getProductImages()
  }
  getProductImages(){
    this.productService.getProductImages(this.obj.id, (results:any) => {
      console.log("Success retrieve product image",results)
        this.productImages = results
        for(let index in results){
          console.log("dataindeximage",results[index].image)
          var byteArray = new Uint8Array(results[index].image.data);
          var blob = new Blob([byteArray], { type: 'image/jpeg' });
          this.imageService.createImageFromBlob(blob,(result:any) => {
            console.log("Image Result",result)
            document.getElementById(results[index].id)!.setAttribute('src',result)
            this.productImages.image = result
            console.log("productImagesImage",this.productImages.image)
          })  
        }
    })
  }
  ngOnInit() {
  }
  priceEdit(vendorId:any,vendorPrice:any){
    console.log("Price Edit Vendor Id",vendorId)
    const editDialog = this.dialog.open(AddVendorDialogComponent,{
      data:{
        isEdit:true,
        vendorId:vendorId,
        vendorPrice:vendorPrice
      }
    })
    editDialog.afterClosed().subscribe(vendor => {
      console.log("Edit params",vendor)
      console.log("Obj id",this.obj.id)
      this.productvendorService.updatePrice({price:vendor.price,vendor_id:vendor.vendor_id,product_id:this.obj.id},(result:any) => {
        console.log("Result edit price",result)
      })
    })
  }
  getAllAssociatedVendors(productId:any){
    this.product = {
      product_id : productId
    }
    this.productvendorService.getVendorByProduct(this.product, (result:any) => {
      //this.length = result.length
      this.vendorsresult = result
/*
      if (result.length>=this.pageSize) {
        for (var i = 0; i < this.pageSize; i++) {
          this.vendorsToDisplay.push(result[i]);
        }
      } else{
        for (var i = 0; i < result.length; i++) {
          this.vendorsToDisplay.push(result[i]);
        }
      }
*/
      //this.dataSource = new MatTableDataSource(this.vendorsToDisplay)
      this.dataSource = new MatTableDataSource(result)
    })
  }

  //functions for paginator
    setPageSizeOptions(setPageSizeOptionsInput:string){
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
    }

    changePage($event:any){
      console.log("Event",$event)
      this.curIndex = $event.pageIndex
      this.pageSize = $event.pageSize
      this.setCurrentPage()
    }
    setCurrentPage(){
      this.vendorsToDisplay=new Array();
      if (this.vendorsresult.length>=(this.curIndex+1)*this.pageSize) {
        for (var i = this.curIndex*this.pageSize; i < (this.curIndex+1)*this.pageSize; i++) {
          this.vendorsToDisplay.push(this.vendorsresult[i]);
        }
      }else{
        for (var i = this.curIndex*this.pageSize; i < this.vendorsresult.length; i++) {
          this.vendorsToDisplay.push(this.vendorsresult[i]);
        }
      }
      this.dataSource = new MatTableDataSource(this.vendorsToDisplay)
    } 
    reloadVendors(){
      this.productvendorService.getVendorByProduct({product_id:this.product_id}, (result:any) => {
        this.vendorsresult = result
        console.log("reloadVendors",result)
        this.dataSource = new MatTableDataSource(result)
      })
    }
    showAddVendorDialog(id:any){
      const dialogRef = this.dialog.open(AddVendorDialogComponent,{
        width:'250px',
        data:{
          isEdit:false
        }
      })
      dialogRef.disableClose = true
      dialogRef.afterClosed().subscribe(vendor => {
        console.log("One",vendor)
        if(!vendor.canceled){
          console.log("Two")
          console.log('Dialogresult vendor',vendor)
          this.productvendorService.associateProductVendor({
            vendor_id:vendor.vendor_id,
            product_id:this.product_id,
            price:vendor.price
          },(result:any) => {
            console.log("Associate Product Vendor",result)
            this.reloadVendors()
          })
        }
      })
    }
    removeVendor(productId:any,vendorId:any){
      console.log("Remove Vendor",productId,vendorId)
      this.productvendorService.disassociateProductVendor({vendor_id:vendorId,product_id:productId},(res:any) => {
        console.log("Disassociate Product Vendor",res)
        this.reloadVendors()
      })
    }
  openDialog(idnya:Number, idGambar:any, type:any): void {
    console.log("idnya", idnya);

    if(type == 1){
      const dialogRef = this.dialog.open(ProductDetailsDialog, {
      width: '250px', 
      data: {id: idnya, imageId:0, status:type}
      });
    }else if(type==2){
      const dialogRef = this.dialog.open(ProductDetailsDialog, {
      width: '750px', 
      data: {id: idnya, imageId: 0, status:type}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          //productImages
          this.getProductImages()
          //location.reload()
        }
      })
    }else if(type==3){
      const dialogRef = this.dialog.open(ProductDetailsDialog, {
      width: '750px', 
      data: {id: this.obj.id, imageId: idnya, status:type}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          this.getProductImages()
          //location.reload()
        }
      })
    }else if(type==4){
      const dialogRef = this.dialog.open(ProductDetailsDialog, {
      width: '750px', 
      data: {id: idnya, imageId: idGambar, status:type}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          location.reload()
        }
      })
    }
  }

}

@Component({
  selector: 'app-product-details',
  templateUrl: 'product-details-dialog.html',
})

export class ProductDetailsDialog {

  obj:any;
  imageId
  productImage:{
    id: number,
    product_id: number,
    image: string,
    imagetype: string
  }={
    id: 0,
    product_id: 0,
    image: '',
    imagetype: ''
  }

  deleteProduct = true;
  deleteImage = true;
  addImage = true;
  editImage = true;

  constructor(
    private router:Router, 
    private product:ProductService, 
    private imageService: ImageService,
    public dialogRef: MatDialogRef<ProductDetailsDialog>, 
    public addVendorDialog: MatDialogRef<AddVendorDialogComponent>,
    private productService: ProductService,    
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    if(data.status == 1){
      this.deleteProduct = false
    }else if(data.status == 2){
      this.addImage = false
      this.productImage.product_id = <number>data.id
    }else if(data.status == 3){
      this.deleteImage = false
      this.imageId = data.imageId
    }else if(data.status == 4){
      this.editImage = false
      this.imageId = data.imageId
      this.productImage.id = <number>data.imageId

      this.productService.getProductImages(data.id, (results:any) => {
      console.log("Success retrieve product image",results)
        for(let index in results){
          if (results[index].id==this.imageId) {
            console.log("dataindeximage",results[index].image)
            var byteArray = new Uint8Array(results[index].image.data);
            var blob = new Blob([byteArray], { type: 'image/jpeg' });
            this.imageService.createImageFromBlob(blob,(result:any) => {
              console.log("Image Result",result)
              document.getElementById('productImages')!.setAttribute('src',result)
            }) 
          } 
        }
    })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(data: DialogData): void {
    this.obj = {
      id:data.id,
      status:'0'
    }

    this.product.setStatusProduct(this.obj, (result:any) => {
      console.log("Success",result)
      this.router.navigate(['/product']);
  })    
    this.dialogRef.close();
  }

  showInputDialog(id:any){
    if(id == 1){
      document.getElementById('uplComponent')!.click()
    } else if(id == 2){
      document.getElementById('uplComponents')!.click()
    }
  }

  uploadFile(id:any, event:any){
    this.imageService.loadImage1(event,1080,(result:any)=>{
      if(id == 1){
        document.getElementById('productImage')!.setAttribute('src',result)
      } else if(id == 2){
        document.getElementById('productImages')!.setAttribute('src',result)
      }
    })
  }

  saveImage(){
    this.productImage.image = document.getElementById('productImage')!.getAttribute('src')||'{}'
    this.product.saveProductImage(this.productImage, (result:any) => {
      console.log('res', result)
      this.dialogRef.close(1)
    })
  }

  updateImage(){
    this.productImage.image = document.getElementById('productImages')!.getAttribute('src')||'{}'
    this.product.updateProductImage(this.productImage, (result:any) => {
      console.log('res', result)
      this.dialogRef.close(1)
    })
  }

  deleteSelectedImage(){
    this.product.deleteProductImage(this.imageId, (result:any) => {
      console.log('res', result)
      this.dialogRef.close(1)
    })
  }

}
