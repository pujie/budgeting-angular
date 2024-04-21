import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserChangepasswordComponent } from '../user-changepassword/user-changepassword.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myid
  obj = {
    username:'',
    id:'',
    email:'',
    active:'',
    level:'',
    image:''
  }
  constructor(
    private imageService:ImageService,
    private user:UserService,
    private dialog:MatDialog,
    private route:ActivatedRoute
  ) {
    this.myid = this.route.snapshot.params['id']
    this.user.getuser({id:this.myid},(result:any)=>{
      console.log('image fetched',result)
      this.obj = result
    })
    this.user.getImage({id:this.myid},(result:any)=>{
      console.log('image fetched',result)
      imageService.createImageFromBlob(result,(image:any)=>{
        console.log('profileimage',result)
        document.getElementById('profileImage')!.setAttribute('src',image)
      })
    })
  }
  ngOnInit() {

  }
  showInputDialog(){
    document.getElementById('uplComponent')!.click()
  }
  uploadFile(event:any){
    this.imageService.loadImage1(event,160,(result:any)=>{
      document.getElementById('profileImage')!.setAttribute('src',result)
    })
  }
  updateProfile(){
    this.obj.image = document.getElementById('profileImage')!.getAttribute('src')||'{}'
    this.user.update(
      this.obj
      ,(result:any)=>{
      console.log('sukses update',result)
    })
  }
  changePassword(){
    this.dialog.open(UserChangepasswordComponent,{
      data:{
        title:'Change User Password'
      }
    })
  }
}
