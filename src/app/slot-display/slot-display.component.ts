import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot, Gender } from '../../../types';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from '../slot-image.service';
import { UtilService } from '../util.service';

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
    private imageService: ImageService,
    private util: UtilService
  ) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
   }

  ngOnInit() {
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  getImageUrl(slot: ServiceSlot): string {
    const imageNames = slot.imageNames;
    if (imageNames && imageNames.length) {
      return this.imageService.getImageUrl(imageNames[0]);
    }
    return null;
  }
}
