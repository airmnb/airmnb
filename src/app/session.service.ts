import { Injectable } from '@angular/core';
import { Account } from "../../types";

@Injectable()
export class SessionService {
  account: Account;
  constructor() { }
  get isLoggedIn(): boolean {
    return this.account != null && this.account.enabled;
  }
  get isProvider(): boolean {
    return this.isLoggedIn && this.account.type === 'provider';
  }
  get isConsumer(): boolean {
    return this.isLoggedIn && this.account.type === 'consumer';
  }
}
