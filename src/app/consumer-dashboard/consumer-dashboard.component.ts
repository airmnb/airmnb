import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlotSearchServiceService } from '../slot-search-service.service';
import { ServiceSlot } from '../../../types';

@Component({
  selector: 'amb-consumer-dashboard',
  templateUrl: './consumer-dashboard.component.html',
  styleUrls: ['./consumer-dashboard.component.css']
})
export class ConsumerDashboardComponent implements OnInit {

  public slots: ServiceSlot[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SlotSearchServiceService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const q = {};
      Object.keys(params).forEach(k => q[k] = +params[k]);
      this.searchService.search(q)
        .subscribe(slots => this.slots = slots);
    });
  }

}
