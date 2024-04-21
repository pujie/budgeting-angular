import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  divisions = [
    {value: 1, viewValue: 'Sales & Marketing'},
    {value: 2, viewValue: 'Technical'},
    {value: 3, viewValue: 'Finance'},
    {value: 4, viewValue: 'General'}
  ]
  statuses = [
    {value: 1, viewValue: "Pending"},
    {value: 2, viewValue: "Approved Only"},
    {value: 7, viewValue: "Deal Price"},
    {value: 8, viewValue: "Received"},
    {value: 9, viewValue: "Verified"},

    {value: 6, viewValue: "Pre-Approval"},
    {value: 2, viewValue: "Approved and not bought"},
    {value: 5, viewValue: "Approved, bought and termin"},
    {value: 4, viewValue: "Approved, bought and paid"},
    {value: 3, viewValue: "Rejected"}
  ]
  months = [
    {value: 1, viewValue: "January"},
    {value: 2, viewValue: "February"},
    {value: 3, viewValue: "March"},
    {value: 4, viewValue: "April"},
    {value: 5, viewValue: "May"},
    {value: 6, viewValue: "June"},
    {value: 7, viewValue: "July"},
    {value: 8, viewValue: "August"},
    {value: 9, viewValue: "September"},
    {value: 10, viewValue: "October"},
    {value: 11, viewValue: "November"},
    {value: 12, viewValue: "December"}
  ]
  formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  }
  quarter_of_the_year(date) 
  {
    var month = date.getMonth() + 1;
    console.log('Qurarter',Math.ceil(month / 3))
    return (Math.ceil(month / 3));
  }
  extractRolesMail(roles,callback){
    roles.foreach(role=>{
      role.map(obj=>{
        return obj.email
      }).join()
    })
  }
  extractMail(role,callback){
    callback(role.map(obj=>{
      console.log('Mail',obj.email)
      return obj.email
    }).join())
  }
  sanitizeString(str){
    if(str)
    return str.replace('"','\\"').replace("'","\\'")
    else
    return ""
  }
  addPreZero(num,callback){
    for(let _c=num.length;_c<2;_c++){
      num = '0'+num
    }
    console.log('_Out',num)
    callback(num)
  }
  createSQLDateFormat(dt:String,callback){
    let _arr = dt.split('/')
    this.addPreZero(_arr[0],month=>{
      this.addPreZero(_arr[1],dat=>{
        console.log('Dat received',dat)
        callback(_arr[2]+'-'+month+'-'+dat)
      })
    })
  }
  convertoblob(bufferArray,callback){
    callback(new Blob([new Uint8Array(bufferArray)],{ type: "image/jpg" }))
  }
  getstrindate(dt:String){
    console.log('DT received',dt)
    return dt.substr(0,10)
  }
  imageNotUploadedYet(){
    return "data:image/png;base64,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QUGBRCLx8fGJjY21tLS8cOFCYmJiZmamSqWqq6v77bffNBpNUFAQkUhcsGBBV1dXWVlZXV0dg8GIjo5+6qmnsrOzpVLp1atX3d3df/755+TkZOBsOTMzUyqV8ni8//znP0eOHFEoFD09PVlZWXQ6ffbs2f/6179OnTrV19enVCqzs7O9vLxAa2QEg8FYsmSJm5tbVVXVn3/+mZ+f39XVNX/+fJVK1dbWlp+fLxQKRSLR7t27L1++rFLbGWjJAAABxElEQVSpamtr09PT5XK5QCAgEAgCgUAmk1VXV1dXV+v1+tDQ0KioqPLycqFQeO3aNaVSuWTJkoGBga+++opAIDQ1NZ0/f/7MmTPFxcV8Pv/jjz+OiIgAQvnwww/Bf0aj0eTn52dlZXE4HG9vbxaLtXTpUgcHh+vXr58+fTotLa2+vj48PPzAgQOgxggEgqWl5Zw5c8CS7ba2Nh6P99JLLzU3N4Oj2aVS6bJly9hsdkREhLm5+d27d7OysgoLCxUKRVRU1N27d2Uy2R9//MHlcv39/WfI0pGZuO7hiaKjo8Pf3z84OPjrr7/28vJ61NnBATgwHT8J6PX6CYzwnkygZCE4A0oWgjOgZB8lMpkMGB8UCkVTUxN2HhUyGnD49Si5ePEi9vxUKyurDz74YIYMzGcsULIQnAE7BhCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCcASULwRlQshCc8f8ALKvTx2aLoBYAAAAASUVORK5CYII="
  }
  clickToUpload(){
    return "data:image/png;base64,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"
  }
}
