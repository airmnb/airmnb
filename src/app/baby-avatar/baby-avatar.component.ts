import { Component, OnInit, Input } from '@angular/core';

import { BabyProfile } from '../../../types';
import { ImageService } from '../core/slot-image.service';

@Component({
  selector: 'amb-baby-avatar',
  templateUrl: './baby-avatar.component.html',
  styleUrls: ['./baby-avatar.component.scss']
})
export class BabyAvatarComponent implements OnInit {
  imageUrl: string;
  @Input() set baby(baby: BabyProfile) {
    if(baby && baby.imageName){
      this.imageUrl = this.image.getImageUrl(baby.imageName);
    }
  }

  constructor(
    private image: ImageService
  ) { }

  ngOnInit() {
  }
}
