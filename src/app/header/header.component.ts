import { Component, OnInit } from '@angular/core';
import { ApiFacade } from '../apiFacade';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'amb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  get hasLoggedIn(): boolean {
    return !!this.accountName;
  }

  get isProvider(): boolean {
    return this.hasLoggedIn && this.sessionService.role === 'provider';
  }

  get isConsumer(): boolean {
    return this.hasLoggedIn && this.sessionService.role === 'consumer';
  }

  get accountName(): string {
    return this.sessionService.account ? this.sessionService.account.name : null;
  }

  selectLanguage(lang: string) {
    this.sessionService.setLanguage(lang);
  }

  ngOnInit() {
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigateByUrl('/');
  }
}
