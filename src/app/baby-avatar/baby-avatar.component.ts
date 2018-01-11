import { Component, OnInit, Input } from '@angular/core';

import { BabyProfile } from '../../../types';

@Component({
  selector: 'amb-baby-avatar',
  templateUrl: './baby-avatar.component.html',
  styleUrls: ['./baby-avatar.component.scss']
})
export class BabyAvatarComponent implements OnInit {
  image: string;
  @Input() set baby(baby: BabyProfile) {
    if(baby && baby.images && baby.images.length){
      this.image = baby.images[0];
    }
  }

  constructor(
  ) { }

  ngOnInit() {
  }
}
