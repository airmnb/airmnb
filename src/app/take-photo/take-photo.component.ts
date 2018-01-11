import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Options, ImageResult } from 'ngx-image2dataurl';

@Component({
  selector: 'amb-take-photo',
  templateUrl: './take-photo.component.html',
  styleUrls: ['./take-photo.component.scss']
})
export class TakePhotoComponent implements OnInit {
  private _autoPopup: boolean;
  @Input() set autoPopup(value: boolean) {
    if(value) {
      this.selectFile();
    }
  }
  @Input() accept = 'image/*';
  @Output() uploaded = new EventEmitter<string>();

  @ViewChild('inputFile') nativeInputFile: ElementRef;

  options: Options = {
    resize: {
      maxHeight: 512,
      maxWidth: 512
    },
    allowedExtensions: ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP']
  };

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
  }

  selectFile() {
      this.nativeInputFile.nativeElement.click();
  }

  selected(imageResult: ImageResult) {
    if (imageResult.error) alert(imageResult.error);
    const imageSrcBase64 = imageResult.resized
      && imageResult.resized.dataURL
      || imageResult.dataURL;
    this.uploaded.emit(imageSrcBase64);
  }
}
