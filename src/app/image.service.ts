import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }
  resizeImage(url, _width, callback){
    var canvas = document.createElement("canvas");
    var MAX_WIDTH_ALLOWED = _width;
    var MAX_HEIGHT = 0;
    canvas.width = _width;
    var img = new Image();
    img.onload = function(){
      MAX_HEIGHT = img.height * MAX_WIDTH_ALLOWED / img.width;
      canvas.height = MAX_HEIGHT;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, MAX_WIDTH_ALLOWED, MAX_HEIGHT);
      callback(canvas.toDataURL("image/jpeg"));
    }
    img.src = url;
  }
  loadImage1(evt,width,callback){
		var input = evt.target;
		var filereader = new FileReader();
		filereader.onload = ()=>{
			this.resizeImage(filereader.result,width, result=>{
        callback(result)
			})
		}
		filereader.readAsDataURL(input.files[0]);
  }
  createImageFromBlob(image: Blob,callback) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
    }, false);
    reader.onloadend = (e)=>{
      callback(reader.result)
    }
    if (image) {
       reader.readAsText(image);
    }
  }

}
