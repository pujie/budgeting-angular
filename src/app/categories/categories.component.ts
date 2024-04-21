import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../category.service';
import { MatPaginator, MatTableDataSource, MatSelectModule, MatIconRegistry,
         MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { PageEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export interface DialogData {
  id: Number;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  displayedColumns: string[] = ['no', 'id', 'name', 'description', 'action'];
  listOfCategories=[];
  length = 100
  pageSize = 10
  pageSizeOptions : number[] = [5,10,25]
  curPageSize=10
  curIndex=0
  searchdata = ''
  pageEvent : PageEvent
  logindata;
  constructor(
    private categories:CategoryService,
    private icon : MatIconRegistry,
    private sanitizer : DomSanitizer,
    private auth:AuthService,
    private router:Router,
    public dialog: MatDialog
  ) {
  this.auth.isLogin(result => {
      console.log("login",result)
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
    });
    this.categories.getCategorypage({pageSize:this.pageSize,pageIndex:0},result => {
      this.icon.addSvgIcon('search',sanitizer.bypassSecurityTrustResourceUrl('assets/round-search-24px.svg'))
      this.icon.addSvgIcon('usericon',sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
      this.listOfCategories = result
      this.curPageSize = this.pageSize
      this.curIndex = this.curIndex
      this.listOfCategories.reverse()
      console.log("Obj",this.listOfCategories)
      this.listOfCategories.reverse()
    })
    this.categories.getCategoryCount(result => {
      console.log("CNT",result)
      this.length = result
    })
  }
  setPageSizeOptions(setPageSizeOptionsInput:string){
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  }
  changePage($event){
    console.log("Event",$event)
    this.curIndex = $event.pageIndex
    this.pageSize = $event.pageSize
    this.setCurrentPage()
  }
  setCurrentPage(){
    this.categories.getCategorypage({pageSize:this.pageSize,pageIndex:(this.curIndex*this.pageSize)},result => {
      this.listOfCategories = result
    })

  }
  doSearch(searchData){
    let searchObj = {searchData:searchData,pageSize:this.curPageSize,pageIndex:this.curIndex}
    console.log("Data to search",searchData)
    console.log("search object", searchObj)
    console.log("this.listOfCategories",this.listOfCategories)
    this.categories.searchCategory(searchObj,result => {
      console.log("Search Result",result)
      this.listOfCategories = result
    })
    this.categories.searchCategoryCount(searchObj, result => {
      console.log("Amount",result)
      this.length = result
    })
  }
  searchKeyDown(event,searchData){
    if(event.key==='Enter'){
      this.doSearch(searchData)
    }
  }
  removeCategory(category){
    category.status = '0'
    this.categories.removeCategory(category,result => {
      console.log("Category remove",result)
      this.setCurrentPage()
    })
  }
  ngOnInit() {
  }
  searchCat(searchText){
    console.log("Search searchText",searchText)
    this.listOfCategories.filter(tofilter => {
      console.log("cat",tofilter.name,"::::searchData",this.searchdata)
      console.log("indexof",tofilter.name.search("Ken"))
      //return tofilter.name == "Kendaraan"
      return tofilter.name.search(this.searchdata)>=0
      //return filter.name>this.searchData
    })
  }
  //function for delete message dialog
  openDialog(idCategory: Number): void {
    console.log("id", idCategory);

    const dialogRef = this.dialog.open(CategoryDialog, {
    width: '250px',
    data: {id: idCategory}
    });
  }

}

@Component({
  selector: 'app-categories',
  templateUrl: 'categories-dialog.html',
})

export class CategoryDialog {

  obj;

  constructor(private categories:CategoryService, public dialogRef: MatDialogRef<CategoryDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.obj = {
      id:data.id,
      status:''
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(dataa: DialogData): void {
    this.obj = {
      id:dataa.id,
      status:'0'
    }

    this.categories.removeCategory(this.obj, result => {
      console.log("Success",result)
      location.reload();
  })
    this.dialogRef.close();
  }

}
