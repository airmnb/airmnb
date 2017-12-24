import { Component, OnInit } from '@angular/core';
import { ServiceSlot, BabyProfile } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { SlotService } from '../slot.service';
import { ApiFacade } from '../apiFacade';
import { ImageService } from '../slot-image.service';

@Component({
  selector: 'amb-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

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
    private api: ApiFacade,
    private imageService: ImageService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryJson = params['q'];
      const query = JSON.parse(queryJson);
      console.log('Search query', query);
      this.searchService.search(query)
        .subscribe(slots => this.slots = slots);
    });

    this.loadBabyProfiles();
  }

  getImageUrl(slot: ServiceSlot) : string {
    if(slot.imageNames && slot.imageNames.length) {
      return this.imageService.getImageUrl(slot.imageNames[0]);
    } else {
      return "";
    }
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

}
