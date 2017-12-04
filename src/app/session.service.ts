import { Injectable } from '@angular/core';
import { Account } from "../../types";
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

const cookieKey = 'c';

@Injectable()
export class SessionService {
  private account = new Subject<Account>();

  constructor(private cookieService: CookieService) { }

  login(account: Account): void {
    this.account.next(account);
    const cookieValue = {
      account
    };
    const json = JSON.stringify(cookieValue);
    this.cookieService.set(cookieKey, json);
  }

  logout(): void {
    this.account.next(null);
    this.cookieService.delete(cookieKey);
  }

  getAccount(): Observable<Account> {
    return this.account.asObservable();
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
