import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceSlot } from '../../../types';
import * as uuid from "uuid";
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {

  public model: ServiceSlot;

  constructor(private router: Router, private session: SessionService) {
    this.model = this.createNewModel();
  }

  private createNewModel(): ServiceSlot {
    const now = new Date();
    return {
      serviceSlotId: uuid.v4(),
      providerId: this.session.account.id,
      date: now,
      timeCondition: {
        startAt: now.getHours(),
        endAt: now.getHours()
      },
      ageCondition: {
        ageFrom: 3,
        ageTo: 6
      },
      genderCondition: {
        gender: "either"
      },
      otherCondition: null,
      price: {
        fixedUnitPrice: 50
      }
    };
  }


  ngOnInit() {
  }

}
