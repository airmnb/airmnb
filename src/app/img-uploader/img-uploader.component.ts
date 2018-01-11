import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Options, ImageResult } from "ngx-image2dataurl";

@Component({
  selector: 'amb-img-uploader',
  templateUrl: './img-uploader.component.html',
  styleUrls: ['./img-uploader.component.scss']
})
export class ImgUploaderComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;

  private _images: string[];
  @Input() set images(value: string[]){
    this._images = value || [];
  }
  get images(): string[]{
    return this._images;
  }
  @Output() imagesChange = new EventEmitter<string[]>();

  options: Options = {
    resize: {
      maxHeight: 512,
      maxWidth: 512
    },
    allowedExtensions: ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP']
  };

  constructor() { }

  ngOnInit() {
  }

  choose() {
    this.fileInput.nativeElement.click();
    console.log('clicked', this.fileInput.nativeElement);
    return false;
  }

  selected(imageResult: ImageResult) {
    if (imageResult.error) alert(imageResult.error);
    const imageSrcBase64 = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.images.push(imageSrcBase64);
    this.imagesChange.emit(this.images);
  }

  remove(index: number) {
    if(!confirm("Delete this image?")) return;
    this.images.splice(index, 1);
    this.imagesChange.emit(this.images);
  }
}
