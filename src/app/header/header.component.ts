import { Component, OnInit } from '@angular/core';
import { ApiFacade } from '../apiFacade';
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sessionService: SessionService) { }

  get hasLoggedIn(): boolean {
    return !!this.accountName;
  }

  get accountName(): string {
    return this.sessionService.account ? this.sessionService.account.name : null;
  }

  selectLanguage(lang: string) {
    this.sessionService.setLanguage(lang);
  }

  ngOnInit() {
  }

}
