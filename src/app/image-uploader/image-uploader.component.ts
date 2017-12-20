import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ImageService } from '../slot-image.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'amb-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  public uploadApiUrl = "/api/image/";
  public readUrl = "/image/";

  private _imageNames: string[] = [];

  public imageUrls: string[] = [];

  @Input() preview = true;
  @Input() set imageNames(names: string[]) {
    this._imageNames = names || [];
    this.imageUrls = this._imageNames.map(x => this.imageService.getImageUrl(x));
  }
  @Output() imageNamesChange = new EventEmitter<string[]>();
  @Output() uploadFinished = new EventEmitter<any>();

  constructor(
    private imageService: ImageService,
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  public async onUploadFinishedCallback(event): Promise<void> {
    const resp = event.serverResponse;
    const filename = resp.text();
    let err: Error = null;
    if(resp.status === 200) {
      this._imageNames.push(filename);
      this.imageNamesChange.emit(this._imageNames);
      this.imageUrls.push(this.imageService.getImageUrl(filename));
    } else {
      err = new Error(resp);
    }
    this.uploadFinished.emit(err);
  }
}
