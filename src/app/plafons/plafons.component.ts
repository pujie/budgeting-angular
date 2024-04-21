import { Component, OnInit, Inject } from '@angular/core';
import { PlafonsService } from '../plafons.service';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DivisionService } from '../division.service';

export interface DialogData {
	type: Number,
  	user: String, 
  	id: Number
}

@Component({
  selector: 'app-plafons',
  templateUrl: './plafons.component.html',
  styleUrls: ['./plafons.component.css']
})
export class PlafonsComponent implements OnInit {
	displayedColumns: string[] = ['no', "division", "city", "quarter", "year","budget_limit", 'action'];
	listOfPlafons:any
	filteredPlafons: Array<any>=[]
	logindata:any
	plafonsToDisplay:any
  	dataSource:any;
  	currentCity = 0
  	currentDivision = 0
  	currentQuarter = 0
    currentYear = 0
  year = new Date().getFullYear()

	//Variables for paginator
    length = 100
    pageSize = 10
    pageSizeOptions : number[] = [5,10,25]
    curPageSize=10
    curIndex=0

    quarters = [
      {value: 1, viewValue: 'Quarter I (Januari-Maret)'},
      {value: 2, viewValue: 'Quarter II (April-Juni)'},
      {value: 3, viewValue: 'Quarter III (Juli-September)'},
      {value: 4, viewValue: 'Quarter IV (Oktober-Desember)'}
	];
	divisions = []
/*
    divisions = [
      {value: 1, viewValue: 'Sales & Marketing'},
      {value: 2, viewValue: 'Teknis'},
      {value: 3, viewValue: 'Keuangan'},
      {value: 4, viewValue: 'Umum'}
    ];*/

    cities = [
      {value: 1, viewValue: 'Surabaya'},
      {value: 2, viewValue: 'Jakarta'},
      {value: 3, viewValue: 'Bali'},
      {value: 4, viewValue: 'Malang'}
    ];

    years = [
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'}
    ]

  constructor(
  	private plafonService : PlafonsService,
  	private auth: AuthService,
  	private router: Router,
    private icon: MatIconRegistry,
    private sanitizer: DomSanitizer,
    public datePipe: DatePipe,
	public dialog: MatDialog,
	public division: DivisionService
  ) { 
	var min = 1
	this.division.getDivisions((divisions:any)=>{
		console.log("DIVISIONS GET",divisions)
		this.divisions = divisions
	})
    for(let index in this.years){
      if(index == "0"){
        this.years[index].values = this.year+1
        this.years[index].viewValue = this.year+1+""
      }else if(index == "1"){
        this.years[index].values = this.year
        this.years[index].viewValue = this.year+""
      }else{
        this.years[index].values = this.year - min
        this.years[index].viewValue = this.year - min+""
        min = min+1
      }
    }

  	this.auth.isLogin((result:any) => {
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
      this.icon.addSvgIcon('usericon',sanitizer.bypassSecurityTrustResourceUrl('assets/round-person-24px.svg'))
    });

  	this.plafonService.getPlafons((result:any) => {
		  //this.filterResult(result)
		  console.log("LIST OF PLAFONS",result)
		  this.listOfPlafons = result
		  //this.setCurrentPage()
		  this.plafonsToDisplay = new MatTableDataSource(this.listOfPlafons)
//		  this.dataSource = new MatTableDataSource(this.listOfPlafons)
  	})

    console.log('tahun', this.year)
  }

  filterResult(result:any){
  	for(let plafon of result){
  		if(plafon.division == 1){
  			plafon.division_name = "Sales & Marketing"
  		}else if(plafon.division == 2){
  			plafon.division_name = "Teknis"
  		}else if(plafon.division == 3){
  			plafon.division_name = "Keuangan"
  		}else if(plafon.division == 4){
  			plafon.division_name = "Umum"
  		}	

  		if(plafon.quarter == 1){
  			plafon.quarter_name = "Januari - Maret"
  		}else if(plafon.quarter == 2){
  			plafon.quarter_name = "April - Juni"
  		}else if(plafon.quarter == 3){
  			plafon.quarter_name = "Juli - September"
  		}else if(plafon.quarter == 4){
  			plafon.quarter_name = "Oktober - Desember"
  		}
  		this.filteredPlafons.push(plafon)
  	}
  	this.listOfPlafons = this.filteredPlafons
    this.length=this.listOfPlafons.length
    this.setCurrentPage()
  }

  _filter(status:any, type:any){
  	var indexArr
  	this.filteredPlafons = []
  	this.plafonService.getPlafons((result:any) => {
  		for(let index in result){
	  		if(result[index].division == 1){
	  			result[index].division_name = "Sales & Marketing"
	  		}else if(result[index].division == 2){
	  			result[index].division_name = "Teknis"
	  		}else if(result[index].division == 3){
	  			result[index].division_name = "Keuangan"
	  		}else if(result[index].division == 4){
	  			result[index].division_name = "Umum"
	  		}	

	  		if(result[index].quarter == 1){
	  			result[index].quarter_name = "Januari - Maret"
	  		}else if(result[index].quarter == 2){
	  			result[index].quarter_name = "April - Juni"
	  		}else if(result[index].quarter == 3){
	  			result[index].quarter_name = "Juli - September"
	  		}else if(result[index].quarter == 4){
	  			result[index].quarter_name = "Oktober - Desember"
	  		}
	  		this.filteredPlafons.push(result[index])
	  		indexArr = parseInt(index)
	  		if(indexArr == result.length-1){
	  			this.filter(status, type)
	  		}
  		}
  	})
  }

  filter(status:any, type:any){
  	if(type == 1){//filter by city
  		this.currentCity = status
  	}else if(type == 2){//filter by division
  		this.currentDivision = status
  	}else if(type == 3){//filter by quarter
  		this.currentQuarter = status
  	}else if(type == 4){//filter by year
      this.currentYear = status
    }

  	if(this.currentCity!=0){
  		var cityName = ""
  		var array = []
  		if(this.currentCity == 1){
  			cityName = "Surabaya"
  		}else if(this.currentCity == 2){
  			cityName = "Jakarta"
  		}else if(this.currentCity == 3){
  			cityName = "Bali"
  		}else if(this.currentCity == 4){
  			cityName = "Malang"
  		}
  		for(let plafon of this.filteredPlafons){
  			if(plafon.city == cityName){
  				array.push(plafon)
  			}
  		}
  		this.filteredPlafons = array
  	}
  	if(this.currentDivision != 0){
  		var array = []
  		for(let plafon of this.filteredPlafons){
  			if(plafon.division == this.currentDivision){
  				array.push(plafon)
  			}
  		}
  		this.filteredPlafons = array
  	}
  	if(this.currentQuarter != 0){
  		var array = []
  		for(let plafon of this.filteredPlafons){
  			if(plafon.quarter == this.currentQuarter){
  				array.push(plafon)
  			}
  		}
  		this.filteredPlafons = array
  	}

    if(this.currentYear != 0){
      var array = []
      for(let plafon of this.filteredPlafons){
        if(plafon.year == this.currentYear){
          array.push(plafon)
        }
      }
      this.filteredPlafons = array
    }

  	this.listOfPlafons = this.filteredPlafons
    this.length=this.listOfPlafons.length
    this.setCurrentPage()
  }

  plafonsDialog(type:any, id:any){
    if (type == 3) {
    	const dialogRef = this.dialog.open(PlafonsDialog, {
	    width: '250px', 
	    data: {type: type, user: this.logindata.name, id: id}
	    });

	    dialogRef.afterClosed().subscribe(result => {
	      if(result != null){
	      	location.reload()
	      }
	    })
    }else{
    	const dialogRef = this.dialog.open(PlafonsDialog, {
	    width: '500px', 
	    data: {type: type, user: this.logindata.name, id: id}
	    });

	    dialogRef.afterClosed().subscribe(result => {
	      if(result != null){
	      	location.reload()
	      }
	    })
    }
  }

  //functions for paginator
    setPageSizeOptions(setPageSizeOptionsInput:string){
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
    }

    changePage($event:any){
      console.log("Event",$event)
      this.curIndex = $event.pageIndex
      this.pageSize = $event.pageSize
      this.length = $event.length
      this.setCurrentPage()
    }
    setCurrentPage(){
      /*this.plafonsToDisplay=new Array();

      if (this.listOfPlafons.length>=(this.curIndex+1)*this.pageSize) {
        for (var i = this.curIndex*this.pageSize; i < (this.curIndex+1)*this.pageSize; i++) {
          this.plafonsToDisplay.push(this.listOfPlafons[i]);
        }
      }else{
        for (var i = this.curIndex*this.pageSize; i < this.listOfPlafons.length; i++) {
          this.plafonsToDisplay.push(this.listOfPlafons[i]);
        }
	  }*/
	  console.log("ListOfPlafons",this.listOfPlafons)
      this.dataSource = new MatTableDataSource(this.listOfPlafons)
    } 

  ngOnInit() {
  }

}

// dialog add new plafons
@Component({
  selector: 'app-plafons',
  templateUrl: 'plafons-dialog.html',
  styleUrls: ['./plafons.component.css']
})

export class PlafonsDialog {

	save = true
	update = true
	deletePlafon = true
  currentYear = new Date().getFullYear()
	oldPlafon = {
		id: 0,
		division: 0,
		division_name:'',
		quarter_name:'',
		city: '',
		quarter: 0,
		budget_limit: Number,
    current_budget: 0,
    year: 0
	}
  currentPlafon = this.oldPlafon
	plafons = {
		division: 0,
		city: '',
		quarter: 0,
		budget_limit: Number,
    current_budget: 0,
    year: 0,budgetused:0
	}

	quarters = [
	    {value: 1, viewValue: 'Januari-Maret (I)'},
	    {value: 2, viewValue: 'April-Juni (II)'},
	    {value: 3, viewValue: 'Juli-September (III)'},
	    {value: 4, viewValue: 'Oktober-Desember (IV)'}
  	];

  	divisions = [
	    {value: 1, viewValue: 'Sales & Marketing'},
	    {value: 2, viewValue: 'Teknis'},
	    {value: 3, viewValue: 'Keuangan'},
	    {value: 4, viewValue: 'Umum'}
  	];

  	cities = [
	    {value: 'Surabaya', viewValue: 'Surabaya'},
	    {value: 'Jakarta', viewValue: 'Jakarta'},
	    {value: 'Bali', viewValue: 'Bali'},
	    {value: 'Malang', viewValue: 'Malang'}
  	];

    years = [
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'},
      {values: 0, viewValue: '0'}
    ]

	constructor(
		private plafonService : PlafonsService,
		public dialog: MatDialog,public division: DivisionService,
    	public dialogRef: MatDialogRef<PlafonsDialog>, 
    	@Inject(MAT_DIALOG_DATA) public data: DialogData,    
	){
	var min = 1
	this.division.getDivisions((divisions:any)=>{
		console.log("DIVISIONS GET",divisions)
		this.divisions = divisions
	})

    for(let index in this.years){
      if(index == "0"){
        this.years[index].values = this.currentYear+1
        this.years[index].viewValue = this.currentYear+1+""
      }else if(index == "1"){
        this.years[index].values = this.currentYear
        this.years[index].viewValue = this.currentYear+""
      }else{
        this.years[index].values = this.currentYear - min
        this.years[index].viewValue = this.currentYear - min+""
        min = min+1
      }
      
    }
		if(data.type == 1){
			this.save = false
		}else if(data.type == 2){
			this.update = false
			this.plafonService.getPlafonsById(data.id, (result:any) => {
				if(result.division == 1){
		  			result.division_name = "Sales & Marketing"
		  		}else if(result.division == 2){
		  			result.division_name = "Teknis"
		  		}else if(result.division == 3){
		  			result.division_name = "Keuangan"
		  		}else if(result.division == 4){
		  			result.division_name = "Umum"
		  		}	

		  		if(result.quarter == 1){
		  			result.quarter_name = "Januari - Maret"
		  		}else if(result.quarter == 2){
		  			result.quarter_name = "April - Juni"
		  		}else if(result.quarter == 3){
		  			result.quarter_name = "Juli - September"
		  		}else if(result.quarter == 4){
		  			result.quarter_name = "Oktober - Desember"
		  		}
				this.oldPlafon = result
			})
		}else if(data.type == 3){
			this.plafonService.getPlafonsById(data.id, (result:any) => {
				this.oldPlafon = result
			})
			this.deletePlafon = false
		}
	}
  saveYear(value:any, date:any){
    this.plafons.year = value.year()
    date.close()
  }
	saveValue(type:any, value:any){
		if(type == 1){
			this.plafons.division = value
			}else if(type == 2){
				this.plafons.quarter = value
			}else if(type == 3){
				this.plafons.city = value
			}else if(type ==4){
			this.plafons.year = value
		}
	}

	updateValue(type:any, value:any){
		if(type == 1){
			this.oldPlafon.division = value
		}else if(type == 2){
			this.oldPlafon.quarter = value
		}else if(type == 3){
			this.oldPlafon.city = value
		}else if(type == 4){
      this.oldPlafon.year = value
    }
	}
	addNewPlafons(){
		this.plafonService.savePlafon(this.plafons, (result:any) => {
			console.log("Add new Plafon Result",result)
			this.dialogRef.close(1)
		})
	}
	updatePlafon(){
		this.plafonService.updatePlafon(this.oldPlafon, (result:any) => {
			console.log(result)
			this.dialogRef.close(1)
		})	
	}
	clearSave(){
		this.plafons.division = 0
		this.plafons.city = ''
		this.plafons.budget_limit = Number
	}
	cancel() {
		console.log('plafon', this.plafons)
    	this.dialogRef.close();
  	}
  	numCheck(event: any) {
	    const pattern = /[0-9\ ]/;
	    let inputChar = String.fromCharCode(event.charCode);
	    if (event.keyCode != 8 && !pattern.test(inputChar)) {
	      event.preventDefault();
	    }
  	}
  	onNoClick(){
		this.dialogRef.close();
	}
	onYesClick(){
		this.plafonService.removePlafon(this.oldPlafon, (result:any) => {
			console.log('del', result)
			this.dialogRef.close(1)
		})
	}
}