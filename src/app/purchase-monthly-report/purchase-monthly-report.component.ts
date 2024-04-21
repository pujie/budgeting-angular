import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { SubmissionService } from '../submission.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
]

@Component({
  selector: 'app-purchase-monthly-report',
  templateUrl: './purchase-monthly-report.component.html',
  styleUrls: ['./purchase-monthly-report.component.css']
})
export class PurchaseMonthlyReportComponent implements OnInit {
  displayedColumns: string[] = ['budgeting_number', 'submission_date', 'subject','stat'];
  dataSource = ELEMENT_DATA;
  months;
  submissions:any
  constructor(
    private commonService: CommonService,
    private submissionService: SubmissionService
  ) {
    this.months = this.commonService.months
    this.submissionService.getSubmissions((submissions:any)=>{
      this.submissions = submissions
      this.dataSource = submissions
      console.log('Submissions',submissions)
    })
  }

  ngOnInit() {
  }

}



