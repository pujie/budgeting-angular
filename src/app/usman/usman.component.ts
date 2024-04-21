import { Component, OnInit } from '@angular/core';
import { DivisionService } from '../division.service';
import { CityService } from '../city.service';
import { UsmanService } from '../usman.service';

@Component({
  selector: 'app-usman',
  templateUrl: './usman.component.html',
  styleUrls: ['./usman.component.css']
})

export class UsmanComponent implements OnInit {
  user = {
    id:localStorage.getItem('id'),
    name:localStorage.getItem('username'),
    email:localStorage.getItem('email'),
    level:localStorage.getItem('level')
  }
  dataSource= [
    {id:1,username:0,role:0,action:0,city:0,symbol:0}
  ]
  divisions:any
  cities:any
  usersroles:any
  displayedColumns: string[] = ['id','role','username','action'];
  constructor(
    private divisionService:DivisionService,
    private citieService: CityService,
    private usmanService: UsmanService
  ) {
    this.divisionService.getDivisions((divisions:any)=>{
      this.divisions = divisions
    })
    this.citieService.getCities((cities:any)=>{
      this.cities = cities
    })
    this.usmanService.getUsersRoles((usersroles:any)=>{
      this.usersroles = usersroles
    })
  }
  manageUsman(id:any){
    console.log('Manage Usman Clicked')
    window.location.href = '/manageRole/'+id
  }

  ngOnInit() {
  }

}
