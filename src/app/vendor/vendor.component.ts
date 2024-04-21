import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatIconRegistry } from '@angular/material/icon';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { VendorService } from '../vendor.service';
import { ProductvendorService } from '../productvendor.service';
import { ProductService } from '../product.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ImageService } from '../image.service';

export interface DialogData {
  id: Number;
  productAssociated:any
}

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  displayedColumns: string[] = ['no', 'id', 'name', 'address', 'phone', 'bank', 'action']
  listOfVendors:any
  logindata:any

  //Variables for paginator
  length = 100
  pageSize = 10
  pageSizeOptions : number[] = [5,10,25]
  curPageSize=10
  curIndex=0

  //Variables for search
  searchdata = ''
  pageEvent : PageEvent = new PageEvent

  blob:any;

  constructor(
    private imageService:ImageService, 
    private vendorService:VendorService, 
    public dialog: MatDialog, 
    private icon : MatIconRegistry, 
    private sanitizer : DomSanitizer, 
    private auth:AuthService, 
    private router:Router
  ) {
    this.icon.addSvgIcon('search',sanitizer.bypassSecurityTrustResourceUrl('assets/round-search-24px.svg'))
    this.icon.addSvgIcon('usericon',sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
    this.curPageSize = this.pageSize
    this.curIndex = this.curIndex
    this.vendorService.getVendorPage({pageSize:this.pageSize,pageIndex:0},(result:any) => {
      this.listOfVendors = result
      console.log("Obj",this.listOfVendors)
      this.listOfVendors.sort()
    })
    this.vendorService.getVendorCount((result:any) => {
      console.log("CNT",result)
      this.length = result
    })
    this.auth.isLogin((result:any) => {
      console.log("login",result)
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {

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
    this.vendorService.getVendorPage({pageSize:this.pageSize,pageIndex:(this.curIndex*this.pageSize)},(result:any) => {
      this.listOfVendors = result
      this.listOfVendors.sort()
    })

  }

  //functions for search vendor
  doSearch(searchData:any){
    let searchObj = {searchData:searchData,pageSize:this.curPageSize,pageIndex:this.curIndex}
    console.log("Data to search",searchData)
    console.log("search object", searchObj)
    this.vendorService.searchVendor(searchObj,(result:any) => {
      console.log("Search Result",result)
      this.listOfVendors = result

    })
    this.vendorService.searchVendorCount(searchObj, (result:any) => {
      console.log("Amount",result)
      this.length = result
    })
  }
  searchKeyDown(event:any,searchData:any){
    if(event.key==='Enter'){
      this.doSearch(searchData)
    }
  }

  //function for delete message dialog
  openDialog(idVendor: Number): void {
    //cek-assosiasi dengan produk
    this.vendorService.getproductsbyvendor({vendor_id:idVendor},(result:any) => {
      console.log("id", idVendor);
      console.log("product associated",result)
      const dialogRef = this.dialog.open(VendorDialog, {
      width: '250px', 
      data: {
        id: idVendor,
        productAssociated:result
      }
      });
      dialogRef.afterClosed().subscribe(res=>{
        console.log("Success remove association",res)
        this.vendorService.setStatusVendor({id:idVendor,status:'0'},(res:any)=>{
          console.log("set status",res)
          this.vendorService.getVendorPage({pageSize:this.pageSize,pageIndex:0},(result:any) => {
            this.listOfVendors = result
            console.log("Obj",this.listOfVendors)
            this.listOfVendors.sort()
          })  
        })
      })  
    })
  }
  
}

@Component({
  selector: 'app-vendor',
  templateUrl: 'vendor-dialog.html',
})

export class VendorDialog {

  obj;
  productvendors:any;
  products
  constructor(
    private productService:ProductService, 
    private productvendorService:ProductvendorService, 
    private vendorService:VendorService, 
    public dialogRef: MatDialogRef<VendorDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.obj = {
      id:data.id,
      status:''
    }
    this.products = data.productAssociated
    console.log("VendorDialogProducts",data.productAssociated)
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(dataa: DialogData): void {
    this.obj = {
      id:dataa.id,
      status:'0'
    }
    this.vendorService.setStatusVendor(this.obj, (result:any) => {
      this.productvendorService.disassociateProductsByVendor({vendor_id:this.obj.id},(result:any) => {
        console.log("Disassociate products by vendor",result)
        //this.getProductVendor();
        console.log("Success",result)
        })
    })
    this.dialogRef.close();
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
      //location.reload()
    })
  }
}