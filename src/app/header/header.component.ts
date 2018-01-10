import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { SessionService } from '../core/session.service';

@Component({
  selector: 'amb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private session: SessionService,
    private router: Router
  ) { }

  get locale(): string {
    return this.session.getLocale();
  }

  set locale(value: string) {
    this.session.setLocale(value);
  }

  get hasLoggedIn(): boolean {
    return !!this.accountName;
  }

  get isProvider(): boolean {
    return this.hasLoggedIn && this.session.isProvider;
  }

  get role(): Role {
    return this.session.role;
  }

  get isConsumer(): boolean {
    return this.hasLoggedIn && this.session.isConsumer;
  }

  get accountName(): string {
    return this.session.account ? this.session.account.name : null;
  }

  selectLanguage(lang: string) {
    this.session.setLanguage(lang);
  }

  ngOnInit() {
  }

  logout(): void {
    this.session.logout();
    this.router.navigateByUrl('/');
  }

  switchToProvider() {
    this.session.changeRole(Role.Provider);
    this.router.navigateByUrl('/slots');

  }

  switchToConsumer() {
    this.session.changeRole(Role.Consumer);
  }

  onClickLocale($event) {
    console.log($event);
    $event.stopPropagation();
  }
}
