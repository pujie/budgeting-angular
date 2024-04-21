import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { CityService } from '../city.service';
import { DivisionService } from '../division.service';
import { AuthService } from '../auth.service';
const ELEMENT_DATA = [
  {position:1,name:'Hydrogen', weight:'1',symbol:'H'},
  {position:1,name:'Oxygen', weight:'1',symbol:'O'},
  {position:1,name:'Carbon', weight:'1',symbol:'C'},
  {position:1,name:'Nitrogen', weight:'1',symbol:'N'},
  {position:1,name:'Natrium', weight:'1',symbol:'Na'},
  {position:1,name:'Boron', weight:'1',symbol:'B'},
  {position:1,name:'Ferum', weight:'1',symbol:'Fe'},
  {position:1,name:'Helium', weight:'1',symbol:'He'},
  {position:1,name:'Calcium', weight:'1',symbol:'Ca'},
]
@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.css']
})
export class BudgetTableComponent implements OnInit {
displayedColumns: string[] = ['city','division','year','quarter','budgetused','budgetlimit','restof'];
yearfilter = '2020'
quarterFilter = 0
division = 0
city = 0
budgets
budgetSum = []
divisions
years = []
quarters = [
  {value:0,viewValue:'All'},
  {value:1,viewValue:'Quarter 1'},
  {value:2,viewValue:'Quarter 2'},
  {value:3,viewValue:'Quarter 3'},
  {value:4,viewValue:'Quarter 4'}
]
cities
ds = []
dataSource= [
  {restof:0,budgetused:0,budgetlimit:0,city:0,division:0,quarter:0,year:0}
]
plafoncreator = false
user = {
  id:localStorage.getItem('id'),
  name:localStorage.getItem('username'),
  email:localStorage.getItem('email'),
  level:localStorage.getItem('level')
}

  constructor(
    private budgetService: BudgetService,
    private cityService: CityService,
    private divisionService: DivisionService,
    private auth:AuthService
    ) {
      var d = new Date();
      this.divisionService.getDivisions(res=>{
        console.log("DIVISIONS",res)
        this.divisions = res
        this.divisions.unshift({id:0,name:'All',createdate:'',createuser:'puji',description:'Show All Division'})
      })
      this.years = this.budgetService.populateYear()
      this.yearfilter = d.getFullYear().toString()
  
      this.years = this.budgetService.populateYear()
      this.yearfilter = d.getFullYear().toString()
      this.cityService.getCities(res=>{
        console.log("CITIES",res)
        this.cities = res
        this.cities.unshift({id:0,name:'All',createdate:'',createuser:'puji'})
      })
    let budgetParams = {
      year:this.yearfilter,
      quarter:this.quarterFilter,
      division_id:this.division,
      city_id:this.city
    }
    this.budgetService.getscityperiod(
      budgetParams,budgetres=>{
        this.budgetService.getscityperiodbudgetlimitsum(budgetParams,budgetsum=>{
          console.log("budgetSum1",budgetsum)
          console.log("Whereis restof",budgetres)
          this.budgets = budgetres
          this.fillDS(budgetres)
          if(budgetsum.length>0){
            this.budgetSum = budgetsum[0]
          }
        })
    })
    this.auth.isMemberOf({user_id:this.user.id,role_id:8},res => {
      if(res.length>0){
        console.log("This user is a plafon creator")
        this.plafoncreator = true
      }else{
        console.log("This user is not a plafon creator")
        this.plafoncreator = false
      }
    })

  }
  fillDS(rows){
    this.ds = rows
  }
  ngOnInit() {
  }
  populateBudgets(event){
    console.log("Event",event)
    console.log("Year",this.yearfilter)
    let budgetParams = {
      year:this.yearfilter,
      quarter:this.quarterFilter,
      division_id:this.division,
      city_id:this.city
    }
    this.budgetService.getscityperiod(
      budgetParams,res => {
        this.budgetService.getscityperiodbudgetlimitsum(budgetParams,budgetSum=>{
          console.log("budgetSum2",budgetSum)
          this.budgets = res
          console.log("RES of Budget",res)
          this.fillDS(res)
          if(budgetSum.length>0){
            this.budgetSum = budgetSum[0]
          }
        })
    })
  }
  budgetAdd(){
    window.location.href = '/budget-add/'
  }
  recalculate(){
    this.budgetService.reCalculateBudget(result=>{
      console.log("Recalculate result",result)
    })
  }
  showHistory(){
    window.location.href = '/budgethistories'
  }
}
