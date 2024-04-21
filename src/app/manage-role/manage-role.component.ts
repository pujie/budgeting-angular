import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  users
  user = {
    id:localStorage.getItem('id'),
    name:localStorage.getItem('username'),
    email:localStorage.getItem('email'),
    level:localStorage.getItem('level')
  }
  role
  constructor(
    private roleService: RoleService,
    private activatedRoute:ActivatedRoute,
    private userService: UserService
    ) {
    /*this.roleService.getRoleMembers({identifier:this.activatedRoute.snapshot.paramMap.get('id')},members=>{
      this.users = members
      this.role = members[0].name
    })*/
    this.userService.getUsers(users=>{
      console.log('Users got',users)
      this.users = users
    })
  }

  ngOnInit() {
  }

}
