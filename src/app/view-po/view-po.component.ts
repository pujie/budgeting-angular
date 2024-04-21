import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubmissionService } from '../submission.service';
import { CommonService } from '../common.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-view-po',
  templateUrl: './view-po.component.html',
  styleUrls: ['./view-po.component.css']
})
export class ViewPOComponent implements OnInit {
nopo = ''
  constructor(
    private dialogRef: MatDialogRef<ViewPOComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private submissionService: SubmissionService,
    private commonService: CommonService,
    private imageService: ImageService
  ) { 
    console.log('data',this.data)
    this.submissionService.getSubmissionDetailBySubmissionId(this.data.submissionId,(res:any)=>{
      console.log('getSubmissionDetail res',res)
      if(!res[0].scanpo){
        this.nopo = res[0].nopo
        document.getElementById('scanPOImage')!.setAttribute('src',this.commonService.imageNotUploadedYet())
      }else{
      this.commonService.convertoblob(res[0].scanpo.data,(blob:any)=>{
        this.imageService.createImageFromBlob(blob,(image:any)=>{
          document.getElementById('scanPOImage')!.setAttribute('src',image)
        })
      })}
    })

  }
  showImage(){
    let fileURL = document.getElementById('scanPOImage')!.getAttribute('src')
    //let wi = window.open(document.getElementById('scanPOImage').getAttribute('src'),'Gambar PO','_blank')
    let wi = window.open()
    wi!.document.write('<iframe src="' + fileURL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
  }
  closeDialog(){
    this.dialogRef.close({info:'Dialog Closed'})
  }
  ngOnInit() {
  }

}
