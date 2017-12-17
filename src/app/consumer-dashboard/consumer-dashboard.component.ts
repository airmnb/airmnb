import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlotService } from '../slot.service';
import { ServiceSlot, BabyProfile } from '../../../types';
import { ModalService } from '../modal.service';
import { SessionService } from '../session.service';
import { ApiService, ApiServiceFactory } from '../api.service';
import * as uuid from 'uuid';
import { ApiFacade } from '../apiFacade';

@Component({
  selector: 'amb-consumer-dashboard',
  templateUrl: './consumer-dashboard.component.html',
  styleUrls: ['./consumer-dashboard.component.css']
})
export class ConsumerDashboardComponent implements OnInit {

  public babyProfileSettings = {
    edit: {
      confirmSave: true,
    },
    add: {
      confirmCreate: true,
      addButtonContent: 'Add new baby'
    },
    delete: {
      confirmDelete: true
    },
    columns: {
      nickName: {
        title: 'Nick Name',
        filter: false
      },
      age: {
        title: 'Age',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [
              {value: 0, title: '< 2'},
              {value: 2, title: '2-3'},
              {value: 3, title: '3-4'},
              {value: 4, title: '4-5'},
              {value: 5, title: '5-6'},
              {value: 6, title: '> 6'}
            ]
          }
        }
      },
      gender: {
        title: 'Gender',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [{value: 0, title: 'Girl'}, {value: 1, title: 'Boy'}]
          }
        },
        valuePrepareFunction: this.displayGender
      },
      hobby: {
        title: 'Hobby',
        filter: false,
        editor: {
          type: 'textarea'
        }
      },
      info: {
        title: 'Additional information',
        filter: false,
        editor: {
          type: 'textarea'
        }
      }
    }
  };
  public slots: ServiceSlot[];
  public babyProfiles: BabyProfile[];

  get hasLoggedIn(): boolean {
    return this.sessionService.hasLoggedIn;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private searchService: SlotService,
    private modalService: ModalService,
    private api: ApiFacade
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryJson = params['q'];
      const query = JSON.parse(queryJson);
      this.searchService.search(query)
        .subscribe(slots => this.slots = slots);
    });

    this.loadBabyProfiles();
  }

  addBaby(){
    this.modalService.openAddBabyModal();
  }

  private displayGender(cell, row){
    const gender = cell === '1' ? 'Boy' :
        cell === '0' ? 'Girl' : '';
    return gender;
  }

  private loadBabyProfiles(){
    if(!this.hasLoggedIn) {
      return;
    }

    this.api.babyProfileApi.list({consumerId: this.sessionService.account.id})
    .then(x => {
      this.babyProfiles = x;
    })
    .catch(console.log);
  }

  onCreate(event){
    const data = event.newData;
    const babyProfile: BabyProfile = {
      nickName: data.nickName,
      age: data.age,
      consumerId: this.sessionService.account.id,
      gender: data.gender,
      id: uuid.v4(),
      hobby: data.hobby,
      info: data.info
    };
    this.api.babyProfileApi.add(babyProfile)
      .then(x => event.confirm.resolve(data))
      .catch(e => event.confirm.reject(e));
  }
  onEdit(event){
    const data = event.newData;
    const babyProfile: BabyProfile = {
      nickName: data.nickName,
      age: data.age,
      id: data.id,
      consumerId: this.sessionService.account.id,
      gender: data.gender,
      hobby: data.hobby,
      info: data.info
    };
    this.api.babyProfileApi.update(babyProfile, data.id)
      .then(x => event.confirm.resolve(data))
      .catch(e => event.confirm.reject(e));
  }
  onDelete(event){
    const id = event.data.id;
    if(id){
      this.api.babyProfileApi.delete(id)
      .then(x => event.confirm.resolve(null))
      .catch(e => event.confirm.reject(e));
    }
  }

}
