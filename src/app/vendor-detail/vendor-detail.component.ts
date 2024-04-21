import { Component, OnInit, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

import { MatTableDataSource } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';
import { VendorService } from '../vendor.service';
import { ProductService } from '../product.service';
import { ProductvendorService } from '../productvendor.service';
import { ImageService } from '../image.service';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { AddVendorDialogComponent } from '../add-vendor-dialog/add-vendor-dialog.component';
import { AddVendorImageDialogComponent } from '../add-vendor-image-dialog/add-vendor-image-dialog.component';

export interface DialogData {
  id: Number;
  pic: Number;
  type: Number;
}

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

	vendor={
		id: '',
		name: '',
		address: '',
		phone: '',
		bankaccount: '',
		invoicesample: null,
		offeringsample: null,
		namecard: null,
		receiptsample: null
	}
	logindata:any;
  authorized = true
  categories = ["Teknis (BTS)", "Teknis (Office)", "Non-teknis", "Kendaraan"]

	//variables for product tables
	listOfProducts:any
  listOfBTS:any
  listOfOffice:any
  listOfnonteknis:any
  listOfkendaraan:any
  listOfPics:any
	listOfBTSProduct: Array<any> = []
	listOfOfficeProduct: Array<any> = []
	listOfKendaraan: Array<any> = []
	listOfNonteknis: Array<any> = []
	columnsToDisplay : string[] = ['no', 'name', 'partNumber', 'unit','price'];
  columnsToDisplayPic: string[] = ['no', 'name', 'role', 'phone', 'email', 'action']
  pageSizeOptions : number[] = [5,10,25]

  //BTS table
  BTSToDisplay=new Array();
  BTSdataSource:any; 
  lengthBTS = 0
	pageSizeBTS = 10
	curPageSizeBTS = 10
	curIndexBTS = 0

  //Office table
  OfficeToDisplay=new Array();
  OfficedataSource:any;
  lengthOffice = 0
  pageSizeOffice = 10
  curPageSizeOffice = 10
  curIndexOffice = 0

  //Non-teknis table
  NonteknisToDisplay=new Array();
  NonteknisdataSource:any;
  lengthNonteknis = 0
  pageSizeNonteknis = 10
  curPageSizeNonteknis = 10
  curIndexNonteknis = 0

  //Kendaraan table
  KendaraanToDisplay=new Array();
  KendaraandataSource:any;
  lengthKendaraan = 0
  pageSizeKendaraan = 10
  curPageSizeKendaraan = 10
  curIndexKendaraan = 0
  vendor_id

  constructor(
  	private vendorService: VendorService,
  	private productService: ProductService,
  	private productVendorService: ProductvendorService,
  	private imageService : ImageService,
  	private auth: AuthService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private icon: MatIconRegistry,
  	private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    const selectedId = +this.route.snapshot.paramMap.get('id')!
    this.vendor_id = this.route.snapshot.paramMap.get('id')
  	this.auth.isLogin((result:any) => {
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
      if(this.logindata.name == "yenni"){
        this.authorized = false;
      }
      this.icon.addSvgIcon('usericon',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
    });
    this.productService.getProducts((result:any) => {
    	this.listOfProducts = result
    })
    this.vendorService.getVendor({id: selectedId}, (result:any) => {
    	this.vendor = result
    	this.setProducByCategory(selectedId)
    })
    this.vendorService.getVendorPics(selectedId, (result:any) => {
      this.listOfPics = result
    })
    this.vendorService.getvendorimage({id: selectedId,imagetype:'namecard'},(result:any) => {
      this.imageService.createImageFromBlob(result, (image:any) => {
        if (image!='') {
          document.getElementById('namecard')!.setAttribute('src',image)
        }
      })
    })
    this.vendorService.getvendorimage({id: selectedId,imagetype:'offeringsample'},(result:any) => {
      this.imageService.createImageFromBlob(result, (image:any) => {
        if (image!='') {
          document.getElementById('offeringsample')!.setAttribute('src',image)
        }
      })
    })
    this.vendorService.getvendorimage({id: selectedId,imagetype:'invoicesample'},(result:any) => {
      this.imageService.createImageFromBlob(result, (image:any) => {
        if (image!='') {
          document.getElementById('invoicesample')!.setAttribute('src',image)
        }
      })
    })
    this.vendorService.getvendorimage({id: selectedId,imagetype:'receiptsample'},(result:any) => {
      this.imageService.createImageFromBlob(result, (image:any) => {
        if (image!='') {
          document.getElementById('receiptsample')!.setAttribute('src',image)
        }
      })
    })
    this.setCurrentPageBTS()
   }
  loadImage(selectedId:any,imageType:any){
    this.vendorService.getvendorimage({id: selectedId,imagetype:imageType},(result:any) => {
      this.imageService.createImageFromBlob(result, (image:any) => {
        if (image!='') {
          document.getElementById(imageType)!.setAttribute('src',image)
        }
      })
    })
  }
  associateProduct(category_id:any){
    console.log("Product Category",category_id)
    const dialogRef = this.dialog.open(AddProductDialogComponent,{
      data:{
        category_id:category_id
      }
    })
    dialogRef.afterClosed().subscribe(product => {
      console.log("Retrieved product",product)
      this.productVendorService.associateProductVendor({
        product_id:product.product,
        vendor_id:this.vendor_id,
        price:product.price,
        createuser:this.logindata.name
      },(result:any)=>{
        console.log("associateProductVendor",result)
        this.getProductByVendorCategory(category_id,(result:any)=>{
          console.log("getproductbyvendorcategory",result)
          switch(category_id){
          case 10:
            this.BTSdataSource = new MatTableDataSource(result)
          break
          case 11:
            this.OfficedataSource = new MatTableDataSource(result)
          break
          case 12:
            this.NonteknisdataSource = new MatTableDataSource(result)
          break
          case 13:
            this.KendaraandataSource = new MatTableDataSource(result)
          break
          }
        })
      })
    })
  }
  numCheck(event: any) {
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  setProducByCategory(selectedId:any){ 
    this.productVendorService.getProductByVendor({vendor_id: selectedId}, (result:any) => {
      console.log("setProductByCategory",result)
        for(let currProduct of result){
          if(currProduct.category == this.categories[0]){//Teknis BTS
            this.listOfBTSProduct.push(currProduct)
            this.curPageSizeBTS = this.pageSizeBTS
            this.curIndexBTS = this.curIndexBTS
            this.lengthBTS = this.lengthBTS+1            
          }else if(currProduct.category == this.categories[1]){//Teknis Office
            this.listOfOfficeProduct.push(currProduct)
            this.curPageSizeOffice = this.pageSizeOffice
            this.curIndexOffice = this.curIndexOffice
            this.lengthOffice = this.lengthOffice+1
          }else if(currProduct.category == this.categories[2]){//Non-teknis
            this.listOfNonteknis.push(currProduct)
            this.curPageSizeNonteknis = this.pageSizeNonteknis
            this.curIndexNonteknis = this.curIndexNonteknis
            this.lengthNonteknis = this.lengthNonteknis+1
          }else if(currProduct.category == this.categories[3]){//Kendaraan
            this.listOfKendaraan.push(currProduct)
            this.curPageSizeKendaraan = this.pageSizeKendaraan
            this.curIndexKendaraan = this.curIndexKendaraan
            this.lengthKendaraan = this.lengthKendaraan+1
          }
        }
      this.listOfBTS = this.listOfBTSProduct
      this.listOfOffice = this.listOfOfficeProduct
      this.listOfnonteknis = this.listOfNonteknis
      this.listOfkendaraan = this.listOfKendaraan

      this.BTSdataSource = new MatTableDataSource(this.listOfBTS)
      this.OfficedataSource = new MatTableDataSource(this.listOfOffice)
      this.NonteknisdataSource = new MatTableDataSource(this.listOfnonteknis)
      this.KendaraandataSource = new MatTableDataSource(this.listOfkendaraan)
    })
  }
 	setPageSizeOptions(setPageSizeOptionsInput:string){
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  }
  changePage($event:any, id:any){
    if(id == 1){//Table BTS
      this.curIndexBTS = $event.pageIndex
      this.pageSizeBTS = $event.pageSize
      this.setCurrentPageBTS()

    }else if(id == 2){//Table Office
      this.curIndexOffice = $event.pageIndex
      this.pageSizeOffice = $event.pageSize
      this.setCurrentPageOffice()

    }else if(id == 3){//Table Non-teknis
      this.curIndexNonteknis = $event.pageIndex
      this.pageSizeNonteknis = $event.pageSize
      this.setCurrentPageNonteknis()

    }else if(id == 4){//Table Kendaraan
      this.curIndexKendaraan = $event.pageIndex
      this.pageSizeKendaraan = $event.pageSize
      this.setCurrentPageKendaraan()
    } 
  }
  getProductByVendorCategory(category_id:any,callback:any){
    this.productService.getProductByVendorCategory({vendor_id:this.vendor_id,category_id:category_id},(result:any)=>{
      callback(result)
    })
  }
  setCurrentPageBTS(){
    console.log("set Current PageBTS invoked")
    this.getProductByVendorCategory(10,(result:any)=>{
      console.log("getCurPageBTS",result)
      this.BTSdataSource = new MatTableDataSource(result)
    })
  } 
  setCurrentPageOffice(){
    this.OfficeToDisplay=new Array();
    if (this.listOfOffice.length>=(this.curIndexOffice+1)*this.pageSizeOffice) {
      for (var i = this.curIndexOffice*this.pageSizeOffice; i < (this.curIndexOffice+1)*this.pageSizeOffice; i++) {
        this.OfficeToDisplay.push(this.listOfOffice[i]);
      }
    }else{
      for (var i = this.curIndexOffice*this.pageSizeOffice; i < this.listOfOffice.length; i++) {
        this.OfficeToDisplay.push(this.listOfOffice[i]);
      }
    }
    this.OfficedataSource = new MatTableDataSource(this.OfficeToDisplay)
  } 
  setCurrentPageNonteknis(){
    this.NonteknisToDisplay=new Array();
    if (this.listOfnonteknis.length>=(this.curIndexNonteknis+1)*this.pageSizeNonteknis) {
      for (var i = this.curIndexNonteknis*this.pageSizeNonteknis; i < (this.curIndexNonteknis+1)*this.pageSizeNonteknis; i++) {
        this.NonteknisToDisplay.push(this.listOfnonteknis[i]);
      }
    }else{
      for (var i = this.curIndexNonteknis*this.pageSizeNonteknis; i < this.listOfnonteknis.length; i++) {
        this.NonteknisToDisplay.push(this.listOfnonteknis[i]);
      }
    }
    this.NonteknisdataSource = new MatTableDataSource(this.NonteknisToDisplay)
  } 
  setCurrentPageKendaraan(){
    this.KendaraanToDisplay=new Array();
    if (this.listOfkendaraan.length>=(this.curIndexKendaraan+1)*this.pageSizeKendaraan) {
      for (var i = this.curIndexKendaraan*this.pageSizeKendaraan; i < (this.curIndexKendaraan+1)*this.pageSizeKendaraan; i++) {
        this.KendaraanToDisplay.push(this.listOfkendaraan[i]);
      }
    }else{
      for (var i = this.curIndexKendaraan*this.pageSizeKendaraan; i < this.listOfkendaraan.length; i++) {
        this.KendaraanToDisplay.push(this.listOfkendaraan[i]);
      }
    }
    this.KendaraandataSource = new MatTableDataSource(this.KendaraanToDisplay)
  } 
  ngOnInit() {
  }
  openDialog(idVendor:any, type:any, picId:any): void {
    console.log("id", idVendor);
    if(type == 1 || type == 4){
      const dialogRef = this.dialog.open(VendorDetailDialog, {
        width: '250px', 
        data: {id: idVendor, type: type, pic:picId}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          this.getvendorpics()
        }
      })
    }else if(type == 2 || type == 3){
      const dialogRef = this.dialog.open(VendorDetailDialog, {
      width: '750px', 
      data: {id: idVendor, type: type, pic:picId}
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result != null){
          this.getvendorpics()
        }
      })
    }
  }
  getvendorpics(){
    this.vendorService.getVendorPics(this.vendor_id,(result:any) => {
      this.listOfPics = result
    })
  }
  changeImagex(x:any){
    if (x==1) {
      this.router.navigate(['/vendorimage/namecard/'+this.vendor.id]);
    } else if (x==2) {
      this.router.navigate(['/vendorimage/offeringsample/'+this.vendor.id]);        
    } else if (x==3) {
      this.router.navigate(['/vendorimage/invoicesample/'+this.vendor.id]);        
    } else {
      this.router.navigate(['/vendorimage/receiptsample/'+this.vendor.id]);
    }
  }
  changeImage(imageType:any){
    const dialogRef = this.dialog.open(AddVendorImageDialogComponent,{
      data:{
        vendor_id:this.vendor_id,
        imageType:imageType
      }
    })
    dialogRef.afterClosed().subscribe(image=>{
      console.log("Image Retrieved",image)
      this.vendorService.updatevendorimage({
        imagetype:image.imageType,
        id:image.vendor_id,
        image:image.image
      }, (result:any)=>{
        console.log("Update Vendor Image",result)
        this.loadImage(this.vendor_id,imageType)
      })
    })
  }
}

@Component({
  selector: 'app-vendor-detail',
  templateUrl: 'vendor-detail-dialog.html',
  styleUrls: ['./vendor-detail.component.css']
})

export class VendorDetailDialog {

  /*obj = {
    id : 0,status:''
  };*/
  productvendors:any;
  oldPic = {
    id: '',
    vendor_id: 0,
    name: '',
    phone: '',
    email: '',
    role: ''
  }

  pic = {
    vendor_id: '',
    name: '',
    phone: '',
    email: '',
    role: ''
  }

  picId
  deleteVendor = true
  addPic = true
  editPic = true
  deletePic = true
  obj : {
    id:Number,status :string
  } = {id:0,status:''}
  constructor(
    private router: Router, 
    private productService:ProductService, 
    private productvendorService:ProductvendorService, 
    private vendorService:VendorService, 
    public dialogRef: MatDialogRef<VendorDetailDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    if(data.type == 1){
      this.obj = {
        id:data.id,
        status:''
      }
      this.deleteVendor = false
    }else if(data.type == 2){
      this.addPic = false
      this.pic.vendor_id = data.id+''
    }else if(data.type == 3){
      this.editPic = false
      this.vendorService.getVendorPics(data.id, (result:any) => {
        for(let pic of result){
          if(pic.id == data.pic){
            this.oldPic = pic
          }
        }
      })
    }else if(data.type == 4){
      this.deletePic = false
      this.picId = data.pic
    }
    
  }

  addNewPIc(){
    this.vendorService.saveVendorPic(this.pic, (result:any) => {
      if(result != null){
        this.dialogRef.close(1)
      }
    })
  }

  updateOldPic(){
    this.vendorService.updateVendorPic(this.oldPic, (result:any) => {
      if (result != null) {
        this.dialogRef.close(1)
      };
    })
  }

  deleteVendorPic(){
    this.vendorService.deleteVendorPic(this.picId, (result:any) => {
      if(result != null){
        this.dialogRef.close(1)
      }
    })
  }

  cancel(){
    this.dialogRef.close()
  }

  //methods for delete vendor
  onNoClick(): void {
    this.dialogRef.close();
  }

  numCheck(event: any) {
      const pattern = /[0-9\ ]/;

      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }

  onYesClick(dataa: DialogData): void {
    this.obj = {
      id:dataa.id,
      status:'0'
    }

    this.vendorService.setStatusVendor(this.obj, (result:any) => {
      this.getProductVendor();
      console.log("Success",result)
    })

    this.dialogRef.close(1);
  }

  getProductVendor(): void{
    this.productvendorService.getProductByVendor({vendor_id:this.obj.id}, (result:any) => {
      this.productvendors=result
      console.log("getProductByVendor",result)

      for (var i = 0; i < this.productvendors.length; i++) {
        this.productService.setStatusProduct({id:this.productvendors[i].id, status:0}, (result:any) => {
          console.log("setStatusProduct",result)
        })
      }

      this.productvendorService.removeAllAssociatedProducts({id:this.obj.id}, (result:any) => {
        console.log("removeAllAssociatedProducts",result)
      })
      this.router.navigate(['/vendor']);
    })
  }
}

