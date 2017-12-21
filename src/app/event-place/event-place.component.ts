import { Component, OnInit } from '@angular/core';
import { ApiFacade } from '../apiFacade';
import { ImageService } from '../slot-image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventPlace, MapLocation, Role } from '../../../types';
import { NotificationService } from '../notification.service';
import { UtilService } from '../util.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-event-place',
  templateUrl: './event-place.component.html',
  styleUrls: ['./event-place.component.css']
})
export class EventPlaceComponent implements OnInit {
  isNew: boolean;
  model: EventPlace = {
    id: this.util.newGuid(),
    providerId: null,
    name: null,
    description: null,
    location: <MapLocation> null,
    imageNames: []
  };

  constructor(
    private api: ApiFacade,
    private imageService: ImageService,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService,
    private router: Router,
    private util: UtilService,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.session.assureRole(Role.Provider);

    this.activatedRoute.params.subscribe(p => {
      const placeId = p.id;
      this.isNew = !placeId;
      if(!this.isNew) {
        // Edit mode
        this.api.placeApi.getOne(placeId)
        .then(
          s => {
            this.model = s;
          }
        ).catch(
          e => this.notification.error(e)
        );
      }

      this.model.providerId = this.session.account.id;
    });
  }

  async onSubmit(): Promise<void>{
    try {
      if(this.isNew) {
        await this.api.placeApi.add(this.model);
        // this.router.navigate(['/places']);
      }else{
        await this.api.placeApi.update(this.model);
      }
    }catch(e){
      this.notification.error(e);
    }
  }

}
