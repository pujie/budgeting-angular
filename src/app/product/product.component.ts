import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/table';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { ProductvendorService } from '../productvendor.service';

export interface DialogData {
  id: Number;
  vendors:any
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
	columnsToDisplay : string[] = ['no', 'name', 'partNumber', 'unit','lastupdate', 'action'];
  listOfProducts:any;
  length = 100
  pageSize = 10
  pageSizeOptions : number[] = [5,10,25]
  curPageSize=10
  curIndex=0
  searchdata = ''
  pageEvent : PageEvent = new PageEvent
  logindata:any;
  login:any;

  constructor(
    private product:ProductService, 
    public dialog: MatDialog, 
    private icon : MatIconRegistry, 
    private sanitizer : DomSanitizer, 
    private auth:AuthService, 
    private router:Router,
    private productVendorService: ProductvendorService
  ) { 
  this.auth.isLogin((result:any) => {
      console.log("login",result)
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
    });
  this.product.getProductpage({pageSize:this.pageSize,pageIndex:0},(result:any) => {
      this.icon.addSvgIcon('search',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-search-24px.svg'))
      this.icon.addSvgIcon('usericon',this.sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
      this.listOfProducts = result
      this.curPageSize = this.pageSize
      this.curIndex = this.curIndex
      console.log("Obj",this.listOfProducts)
    });
  this.product.getProductCount((result:any) => {
      console.log("CNT",result)
      this.length = result
    });
  }
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
    this.product.getProductpage({pageSize:this.pageSize,pageIndex:(this.curIndex*this.pageSize)},(result:any) => {
      console.log("Result",result)
      this.listOfProducts = result
    })

  }
  doSearch(searchData:any){
    let searchObj = {
      searchData:searchData,pageSize:this.curPageSize,pageIndex:this.curIndex}
    console.log("Data to search",searchData)
    this.product.searchProduct(searchObj,(result:any) => {
      console.log("Search Result",result)
      this.listOfProducts = result
    })
    this.product.searchProductCount(searchObj, (result:any) => {
      console.log("Amount",result)
      this.length = result
    })
  }
  searchKeyDown(event:any,searchData:any){
    if(event.key==='Enter'){
      this.doSearch(searchData)
    }
  }
  openDialog(productId:Number): void {
    console.log("productId", productId);
    this.productVendorService.getVendorByProduct({product_id:productId},(result:any) => {
      console.log("vendors by product",result)
      const dialogRef = this.dialog.open(ProductDialog, {
        width: '250px', 
        data: {
          id: productId,vendors:result}
      });
      dialogRef.afterClosed().subscribe(product => {
        this.product.setStatusProduct(product, (result:any) => {
          console.log("Res",product)
          console.log("Result",result)
          this.productVendorService.disassociateVendorsByProduct({product_id:product.id},(result:any) => {
            console.log('disassociate result',result)
            this.setCurrentPage()
          })
          //location.reload();
      })
    
      })
    })
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-product',
  templateUrl: 'product-dialog.html',
})
export class ProductDialog {
  obj:any;
  vendors
  constructor(
    private router:Router, 
    private product:ProductService, 
    public dialogRef: MatDialogRef<ProductDialog>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.vendors = data.vendors
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(data: DialogData): void {
    this.obj = {
      id:data.id,
      status:'0'
    }
    this.dialogRef.close(this.obj);
  }

}