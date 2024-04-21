import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../budget.service';
import { DivisionService } from '../division.service';
import { CityService } from '../city.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
budgets
budgetSum = []
division=0
divisions
yearfilter
years = []
quarterFilter = 0
quarters = [
  {value:0,viewValue:'All'},
  {value:1,viewValue:'Quarter 1'},
  {value:2,viewValue:'Quarter 2'},
  {value:3,viewValue:'Quarter 3'},
  {value:4,viewValue:'Quarter 4'}
]
city=0
cities
  constructor(
    private budgetService: BudgetService,
    private divisionService: DivisionService,
    private cityService: CityService
  ) {
    var d = new Date();
    console.log("Current Year",d.getFullYear())
    this.yearfilter = d.getFullYear()
    this.divisionService.getDivisions(res=>{
      console.log("DIVISIONS",res)
      this.divisions = res
      this.divisions.unshift({id:0,name:'All',createdate:'',createuser:'puji',description:'Show All Division'})
    })
    this.years = this.budgetService.populateYear()
    this.yearfilter = d.getFullYear().toString()
    this.cityService.getCities(res=>{
      console.log("CITIES",res)
      this.cities = res
      this.cities.unshift({id:0,name:'All',createdate:'',createuser:'puji'})
    })
    let budgetParams = {
      year:this.yearfilter,
      quarter:0,
      division_id:0,
      city_id:0
    }
    this.budgetService.getscityperiod(
      budgetParams,budgetres=>{
        this.budgetService.getscityperiodbudgetlimitsum(budgetParams,budgetsum=>{
          console.log("budgetSum1",budgetsum)
          this.budgets = budgetres
          if(budgetsum.length>0){
            this.budgetSum = budgetsum[0]
          }
        })
    })
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
    this.budgetService.recalculateplafon(result=>{
      console.log("Recalculate result",result)
    })
  }
}
