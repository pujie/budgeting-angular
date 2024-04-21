import { Component, OnInit } from '@angular/core';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-padiadmintest',
  templateUrl: './padiadmintest.component.html',
  styleUrls: ['./padiadmintest.component.css']
})
export class PadiadmintestComponent implements OnInit {

  constructor(private mailService : MailService) { }

  ngOnInit() {
  }
  testMail(){
    let msg = 'test'
    this.mailService.postMail({
      recipient:'puji@padi.net.id',
      msg:msg,cc:'pw.prayitno@yahoo.co.id,pw.prayitno@gmail.com',
      subject:'padiNETd'
    },(res:any)=>{
      console.log("Suksed mengirim mail")
    })
  }

}
