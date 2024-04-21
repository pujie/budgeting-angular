import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PaymentService } from '../payment.service';
import { SubmissionService } from '../submission.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import { PlafonsService } from '../plafons.service';
import { BudgetService } from '../budget.service';
import { MailService } from '../mail.service';
import { ActivitylogService } from '../activitylog.service';
import { RoleService } from '../role.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-payment-save',
  templateUrl: './payment-save.component.html',
  styleUrls: ['./payment-save.component.css']
})
export class PaymentSaveComponent implements OnInit {
	currentDate = new Date();
  payment:{
    submission_detail_id:number,
    payment_date:string,
    payment_type:string,
    amount:number,
    createuser:string
  } ={
    submission_detail_id:0,
    payment_date:'',
    payment_type:"cash",
    amount:0,
    createuser:''
  };
  detailId
  logindata:any;

  submission = {final_price:0,itemname:'',id:0,budgeting_number:''}
  payments:any
  sisa=0
  tempNumber:any
  saveButtonDisabled = false
  constructor(
    private submissionService: SubmissionService,
    private location: Location,
    private paymentService:PaymentService, 
    private auth:AuthService, private router:Router, 
    private activatedRoute: ActivatedRoute,
    public datepipe: DatePipe,
    public plafonService: PlafonsService,
    private mailService: MailService,
    private budgetService: BudgetService,
    private activityLogService: ActivitylogService,
    private roleService: RoleService,
    private commonService: CommonService) {
    this.detailId = +this.activatedRoute.snapshot.paramMap.get('id')!; 

    this.submissionService.getSubmissionDetail(this.detailId, (result:any) =>{
      console.log("getSubmissionDetail Result",result)
      this.submission=result[0]
      this.paymentService.getPaymentsBySubmissionDetailId({id:this.detailId},(results:any) => {
        this.payments = results;
        for(let i=0;i<this.payments.length;i++){
          this.sisa=this.sisa+this.payments[i].amount
        }
        this.sisa=this.submission.final_price-this.sisa
        this.payment.amount = this.sisa
      });
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    this.auth.isLogin((result:any) => {
      console.log("login",result)
      this.logindata = result
      if (this.logindata.name=="JsonWebTokenError" || this.logindata.name=="TokenExpiredError") {
        this.router.navigate(['/login']);
      }
      this.payment.createuser=this.logindata.name;
    });
    this.plafonService.getBudget(
      {
        city:'Surabaya',
        year:this.plafonService.getYear(),
        quarter:this.plafonService.getQuarter(),division:1
      },(result:any)=>{
        console.log("getBudget Result",result)
      })
  }
  getTime(){
    let d = new Date();
    return {
      year:d.getFullYear(),
      month:d.getMonth()+1,
      date:d.getDate(),
      quarter:Math.ceil((d.getMonth()+1)/3)
    }
  }
  updatePlafon(){
    this.plafonService.updatePlafon(
      {
        city:this.location,
        year:this.plafonService.getYear,
        quarter:this.plafonService.getQuarter,
        budgetused:0
      },(plafonResult:any) => {
      if (this.payment.amount==this.sisa) {
        this.submissionService.setSubmissionDetailStatus({id:this.detailId, status:4}, (result:any) => {
              console.log("Success",result)
              this.budgetService.recalculateplafon((result:any)=>{
                console.log("Recalculate result",result)
                let msg = '<h1>' + this.submission.itemname + '</h1><br />'
                msg+= '<h3>('+this.submission.budgeting_number+')</h3>'
                msg+= '<h2>Telah dibayar</h2>'
                msg+= '<br />'
                msg+= '<br />'
                msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+this.submission.id+'/1">'
                msg+= 'Go to Application'
                msg+= '</a> <br /><br /><br />'
                msg+= 'PadiNET BudgetingApp'
            
                this.roleService.getRoleMails({identifier:'warehouse'},(users:any)=>{
                  this.commonService.extractMail(users,(mailArray:any)=>{
                    this.mailService.postMail({
                      recipient:'puji@padi.net.id,'+localStorage.getItem('email')+' ',
                      msg:msg,
                      subject:'Payment for '+this.submission.itemname+'('+this.submission.budgeting_number+'), payment Amount:'+this.payment.amount
                    },(res:any)=>{
                      this.activityLogService.create({
                        email:localStorage.getItem('email'),
                        module:'Budget',
                        description:'Update Budget, user'+localStorage.getItem('username')+', Amount:'+this.payment.amount
                      },(res:any)=>{
                        this.mailToInventory({msg:msg},(res:any)=>{
                          window.location.href = '/landing'
                        })
                      })
                    })
                  })
                })
              })
          })
      }  
    })

  }
  mailToInventory(obj:any,callback:any){
    this.mailService.postMail({
      recipient:'rara@padi.net.id,puji@padi.net.id',
      msg:obj.msg,
      subject:'Payment alert for '+this.submission.itemname
    },(res:any)=>{
      this.activityLogService.create({
        email:localStorage.getItem('email'),
        module:'Budget',
        description:'Payment Notification, user '+localStorage.getItem('username')+', Amount:'+this.payment.amount
      },(res:any)=>{
        callback()
      })
    })
  }
  savePayment(obj:any){
    let _time = this.getTime()
    if(obj.payment_date != '' && obj.payment_type != '' && obj.amount != ''){
      this.saveButtonDisabled = true
    	this.payment.submission_detail_id = this.detailId;
  		this.payment.payment_date = this.datepipe.transform(obj.payment_date, 'yyyy-MM-dd') || '{}'
  		this.payment.payment_type=obj.payment_type;
  		this.payment.amount=obj.amount;

    	console.log("obj",this.payment)
      this.paymentService.savePayment(this.payment,(result:any) => {
        console.log("Success",result)
        this.budgetService.saveBudgetHistory({
          year:_time.year,
          quarter:_time.quarter,
          city_id:'1',
          division:'1',
          transtype:'0',
          amount:this.payment.amount,
          description:'',
          user_id:localStorage.getItem('id')
        },(history:any)=>{
          console.log('History',history)
          this.updatePlafon()
        })
      })
    }else{
      alert("Data tidak boleh kosong!");
      console.log("Error! data tidak lengkap")
    }
  }

  clearInput(){
    this.payment.submission_detail_id=0;
  	this.payment.payment_date='';
  	this.payment.payment_type='';
  	this.payment.amount=0;
  	this.payment.createuser='';
  }

  ngOnInit() {
  }

  backToLastPage() {
    this.location.back();
  }

  checkSisa(sisa:any){
    if (this.payment.amount>sisa) {
      this.payment.amount=this.tempNumber
    } else{
      this.tempNumber=this.payment.amount
      }
  }
}
