import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceSlot } from '../../../types';
import * as uuid from "uuid";
import { SessionService } from '../session.service';
import * as moment from "moment";
import { ApiService, ApiServiceFactory } from '../api.service';

@Component({
  selector: 'amb-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {

  public model: ServiceSlot;

  constructor(private router: Router, private session: SessionService, private apiFactory: ApiServiceFactory) {
    this.model = this.createNewModel();
    this.session.getAccount().subscribe(account => this.model.providerId = account.id);
  }

  private createNewModel(): ServiceSlot {
    const now = moment();
    return {
      serviceSlotId: uuid.v4(),
      providerId: null,
      date: {
        year: now.year(),
        month: now.month(),
        day: now.date()
      },
      timeCondition: {
        startAt: {
          hour: now.hour(),
          minute: 0
        },
        endAt: {
          hour: now.hour() + 2,
          minute: 0
        }
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

  async create() {
    const api = this.apiFactory.produce('slot');
    try{
      await api.add(this.model);
      this.router.navigateByUrl('provider');
    }catch(e){
      alert(e);
    }
  }
}
