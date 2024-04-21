import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {
  componentToRemove
  constructor(
    private dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    this.componentToRemove = this.data.componentToRemove
  }

  ngOnInit() {
  }
  remove(){
    this.dialogRef.close({remove:"Iyes",data:this.data})
  }
}
