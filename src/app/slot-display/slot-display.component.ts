import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot, Gender } from '../../../types';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../slot-image.service';

@Component({
  selector: 'amb-slot-display',
  templateUrl: './slot-display.component.html',
  styleUrls: ['./slot-display.component.css'],
  providers: [NgbCarouselConfig]
})
export class SlotDisplayComponent implements OnInit {

  @Input() slot: ServiceSlot;

  constructor(
    config: NgbCarouselConfig,
    private imageService: ImageService
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
   }

  ngOnInit() {
  }

  displayGender(gender: Gender): string {
    return gender === Gender.Boy ? 'Boy' :
      gender === Gender.Girl ? 'Girl' :
      'Both';
  }

  getImageUrl(imageName: string): string {
    return this.imageService.getImageUrls([imageName])[0];
  }
}
