import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceFactory, ApiService } from '../api.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css']
})
export class ProviderDashboardComponent implements OnInit {
  private slotApi: ApiService;
  constructor(apiServiceFactory: ApiServiceFactory, private sessionService: SessionService, private router: Router) {
    this.slotApi = apiServiceFactory.produce("slot");
  }

  ngOnInit() {
  }


}
