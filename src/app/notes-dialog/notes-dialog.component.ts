import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from '../notes.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css']
})
export class NotesDialogComponent implements OnInit {
notes
  constructor(
    private noteService:NotesService,
    private dialog:MatDialog,
    private dialogRef:MatDialogRef<NotesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) {
    this.noteService.getBySubmissionId({submission_id:data.submissionId},notes=>{
      console.log("Res get notes",notes)
      this.notes = notes
    })
  }
  addNote(){
    const dialog = this.dialog.open(AddNoteComponent,{
      data:{
        submission_id:this.data.submissionId,
        createuser:this.data.createuser
      }
    })
    dialog.afterClosed().subscribe(data=>{
      this.noteService.getBySubmissionId({submission_id:this.data.submissionId},notes=>{
        console.log("Res get notes",notes)
        this.notes = notes
      })  
    })
  }
  ngOnInit() {
  }
  closeDialog(){
    this.dialogRef.close()
  }
}
