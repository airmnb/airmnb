import { Component, OnInit, Input, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { ServiceSlot, Gender } from '../../../types';
import { ImageService } from '../slot-image.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'amb-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class SlotListComponent implements OnInit, OnChanges, DoCheck {


  private _slots: ServiceSlot[];

  @Input() set slots(slots: ServiceSlot[]){
    this._slots = slots;
    if(this._slots) {
      this._slots.forEach(s => {
        Object.assign(s, {
          stars: Array(this.getSlotRate(s)).fill(null)
        });
      });
    }
  }

  get slots(){
    return this._slots;
  }

  constructor(
    private slotImageService: ImageService,
    private session: SessionService,
    private router: Router,
    private util: UtilService,
    private imageService: ImageService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngDoCheck(){
  }

  displayGender(gender: Gender): string {
    return gender === Gender.Boy ? 'Boy' :
      gender === Gender.Girl ? 'Girl' :
      'Both';
  }

  getImageUrl(imageName: string): string {
      return this.imageService.getImageUrl(imageName);
  }

  private getSlotRate(slot: ServiceSlot): number {
    return Math.floor(Math.random() * 3) + 3; // 3,4,5
  }

  book(slot: ServiceSlot) {
    this.router.navigate(['bookings/add', slot.id]);
    return false;
  }
}
