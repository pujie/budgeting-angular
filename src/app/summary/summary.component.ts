import { Component, OnInit } from '@angular/core';
import { SubmissionService } from '../submission.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
displayedColumns
pickerstart:any
dataSource = []
  constructor(
    private submissionService: SubmissionService
  ) {
    this.displayedColumns = [
      'submission_date', 
      'budgeting_number', 
      'staff', 
      'itemname',
      'amount',
      'proposed_totalprice',
      'placement_location','status',
      'action'
  ];
    this.submissionService.getSubmissions((submissionResults:any)=>{
      console.log("Submissions",submissionResults)
      this.fillDS(submissionResults)
    })
  }
  fillDS(rows:any){
    this.dataSource = rows
  }
  ngOnInit() {
  }
  dateChange(event:any){
    let _date = event.value._i
    this.pickerstart = _date.year+'-'+_date.month+'-'+_date.date
    console.log("Event year",event.value._i.year)
    console.log("Event month",event.value._i.month)
    console.log("Event date",event.value._i.date)
  }
}
