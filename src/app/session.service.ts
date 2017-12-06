import { Injectable } from '@angular/core';
import { Account } from "../../types";
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

const cookieKey = 'c';

@Injectable()
export class SessionService {
  private accountSubject = new Subject<Account>();
  private _account: Account;

  constructor(private cookieService: CookieService) { }

  get account(): Account {
    return this._account;
  }

  login(account: Account): void {
    this._account = account;
    this.accountSubject.next(account);
    const cookieValue = {
      account
    };
    const json = JSON.stringify(cookieValue);
    this.cookieService.set(cookieKey, json);
  }

  logout(): void {
    this._account = null;
    this.accountSubject.next(null);
    this.cookieService.delete(cookieKey);
  }

  getAccount(): Observable<Account> {
    return this.accountSubject.asObservable();
  }

  loadCookie(): void {
    const cookieValue = this.cookieService.get(cookieKey);
    if (cookieValue) {
      const obj = JSON.parse(cookieValue);
      if (obj) {
        const account = obj.account;
        if (account) {
          this.login(account);
          return;
        }
      }
    }

    this.logout();
  }
}
