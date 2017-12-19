import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.css']
})
export class AccountProfileComponent implements OnInit {
  constructor(
    private session: SessionService
  ) { }

  ngOnInit() {
  }

  get profileRole(): string {
    return this.session.role;
  }
}
