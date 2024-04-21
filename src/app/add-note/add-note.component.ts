import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from '../notes.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  description
  constructor(
    private noteService: NotesService,
    private dialogRef:MatDialogRef<AddNoteComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) { }
  saveNote(){
    this.noteService.addNote(
      {
        submission_id:this.data.submission_id,
        description:this.description,
        state:'AddVendorComparison',
        createuser:this.data.createuser
      },
    res=>{
      console.log("Result",res)
      this.dialogRef.close()
    })
  }
  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close()
  }
}
