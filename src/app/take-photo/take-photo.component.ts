import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

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

  constructor(
    private http: Http
  ) { }

  ngOnInit() {
  }

  async onNativeInputFileSelect($event) {
    const fileList: FileList = event.target['files'];
    if (!fileList.length) {
      return;
    }

    const file = fileList[0];
    const formData = new FormData();
    formData.append('image', file, file.name);

    const headers = new Headers();
    // It is very important to leave the Content-Type empty
    // do not use headers.append('Content-Type', 'multipart/form-data');
    // const options = new RequestOptions({headers: headers});
    const options = null;
    try{
      const resp = await this.http.post('/api/image', formData, options).toPromise();
      const imageName = resp.text();
      this.uploaded.emit(imageName);
    }catch(e){
      console.log(e);
    }
  }

  selectFile() {
      this.nativeInputFile.nativeElement.click();
      console.log('auto popup');
  }
}
