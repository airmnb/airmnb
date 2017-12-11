import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlotSearchServiceService } from '../slot-search-service.service';
import { ServiceSlot, BabyProfile } from '../../../types';
import { ModalService } from '../modal.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-consumer-dashboard',
  templateUrl: './consumer-dashboard.component.html',
  styleUrls: ['./consumer-dashboard.component.css']
})
export class ConsumerDashboardComponent implements OnInit {

  public slots: ServiceSlot[];
  public babies: BabyProfile[];

  get hasLoggedIn(): boolean {
    return this.sessionService.hasLoggedIn;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private searchService: SlotSearchServiceService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = {};
      Object.keys(params).forEach(k => q[k] = +params[k]);
      this.searchService.search(q)
        .subscribe(slots => this.slots = slots);
    });
  }

  addBaby(){
    this.modalService.openAddBabyModal();
  }

  private loadBabyProfiles(){

  }

}
