import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../core/notification.service';

@Component({
  selector: 'amb-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  infos = [];
  errors = [];

  constructor(private notification: NotificationService) {
    notification.getInfo().subscribe(info => {
      this.infos.push(info);
    });
    notification.getError().subscribe(error => this.errors.push(error));
  }

  ngOnInit() {
  }

}
