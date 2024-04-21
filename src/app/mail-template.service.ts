import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService {

  constructor() { }
  submissionCreateNotification(obj){
    let msg = 'A purchase submmission was created by '+ obj.creator +'<br /> '
    msg+= '<h1>' + obj.itemName + '</h1><br />'
    msg+= 'Please verify this submission <br />'
    msg+= '<a href="http://budgeting.padinet.com/verification/'+obj.submissionId+'">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'Cheers'
    msg+= '<br /><br /><br />'
    msg+= 'BudgetingApp'
    return msg
  }
  submissionVerifiedNotification(obj){
    let msg = 'A purchase submmission was verified by '+ obj.creator +'<br /> '
    msg+= '<h1>' + obj.itemName + '</h1><br />'
    msg+= 'Please add comparison vendors to this submission <br />'
    msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+obj.submissionId+'/1">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'Cheers'
    msg+= '<br /><br /><br />'
    msg+= 'BudgetingApp'
    return msg
  }
  submissionRejectedNotification(obj){
    let msg = 'Your purchase submmission ('+obj.budgeting_number+') was '+obj.status+' by '+ obj.creator +'<br /> '
    msg+= '<h1>' + obj.itemName + '</h1><br />'
    msg+= '<h3> Reason '+ obj.reason + '</h3>'
    msg+= 'For more information please contact  '+obj.creator+' <br />'
    msg+= '<br /><br /><br />'
    msg+= 'Cheers'
    msg+= '<br /><br /><br />'
    msg+= 'BudgetingApp'
    return msg
  }
  itemReceived(obj){
    let msg = 'Helo '+ obj.creator +',<br /> '
    msg+= 'Your item submission <br />'
    msg+= '<h1>' + obj.itemName + '</h1><br />'
    msg+= 'has already received<br />'
    msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+obj.submissionId+'/1">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'Cheers'
    msg+= '<br /><br /><br />'
    msg+= 'BudgetingApp'
    return msg
  }
  addVendorComparison(obj){
    let msg = 'A Vendor Comparison Review has created by '+ obj.creator +'<br /> '
    msg+= '<h1>' + obj.itemname + '</h1><br />'
    msg+= '<h2>Vendors</h2>'
    msg+= '<table>'
    msg+= obj._vendors
    msg+= '</table>'
    msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+obj.submissionId+'/1">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'PadiNET BudgetingApp'
    return msg
  }
  approvalMail(approval){
    let msg = 'Hi '+ approval.createuser +'<br /> '
    msg+= 'Your purchasing submission has '+approval.approvalStatus+' <br />'
    msg+= '<h1>' + approval.itemName + '</h1><br />'
    msg+= '<h2>Rp. '+ approval.price +',-</h2>'
    msg+= '<br />'
    if(approval.approvalStatus == "rejected"){
      msg+= '<br />Reason : '+approval.rejectReason+'<br /> '
    }
    msg+= '<br />'
    msg+= '<a href="http://budgeting.padinet.com/submission-detail/'+approval.submissionId+'/1">'
    msg+= 'Go to Application'
    msg+= '</a> <br /><br /><br />'
    msg+= 'PadiNET BudgetingApp'
    return msg
  }

}
