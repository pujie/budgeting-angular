import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSelectModule, MatDialog, 
         MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry } from '@angular/material';
import { PageEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { VendorService } from '../vendor.service';
import { ProductService } from '../product.service';
import { ProductvendorService } from '../productvendor.service';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
	//displayedColumns: string[] = ['no', 'vendor', 'address','name', 'partnumber', 'unit'];
  displayedColumns: string[] = ['no', 'name', 'partnumber', 'unit', 'action'];

  categoryToDisplay=new Array();
  categoryresult;
  dataSource;

	length = 100
	pageSize = 10
	pageSizeOptions : number[] = [5,10,25]
	curPageSize=10
	curIndex=0
	logindata

	category = {
		id: 0,
		name: '',
		description:''
	}
	temp = {
		name: '',
		partnumber: '',
		unit: '',
		vendor: '',
		address:''
	}
	tempResults: Array<any> = []

  constructor(
  	private categoryService: CategoryService,
  	private vendorService: VendorService,
  	private productService: ProductService,
  	private productVendorService: ProductvendorService,
  	private auth: AuthService,
  	private router: Router,
  	private route: ActivatedRoute,
  	private icon: MatIconRegistry,
  	private sanitizer: DomSanitizer
  ) { 
  	const categoryid = +this.route.snapshot.paramMap.get('id')

  	this.auth.isLogin(result => {
      console.log("login",result)
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
    })

    this.categoryService.getCategory({id: categoryid}, result =>{
    	this.category = result
    })

    this.productService.getProductByCategory({category_id: categoryid}, result => {
      this.categoryresult = result
      this.length = result.length      
      this.dataSource = new MatTableDataSource(this.categoryresult)
    })
  }

    changePage($event){
      console.log("Event",$event)
      this.curIndex = $event.pageIndex
      this.pageSize = $event.pageSize
      this.setCurrentPage()
    }

    setCurrentPage(){
      this.categoryToDisplay=new Array();

      if (this.categoryresult.length>=(this.curIndex+1)*this.pageSize) {
        for (var i = this.curIndex*this.pageSize; i < (this.curIndex+1)*this.pageSize; i++) {
          this.categoryToDisplay.push(this.categoryresult[i]);
        }
      }else{
        for (var i = this.curIndex*this.pageSize; i < this.categoryresult.length; i++) {
          this.categoryToDisplay.push(this.categoryresult[i]);
        }
      }

      console.log("this.categoryToDisplay",this.categoryToDisplay)
      this.dataSource = new MatTableDataSource(this.categoryToDisplay)
    } 

  ngOnInit() {
  }

}
