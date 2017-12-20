import { Injectable } from '@angular/core';
import { Account, AccountProfile } from "../../types";
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ApiFacade } from './apiFacade';
import { Router } from '@angular/router';

const cookieKey = 'c';
const langKey = 'lang';

@Injectable()
export class SessionService {
  private accountSubject = new Subject<Account>();
  private _account: Account;
  private _role: string;
  private _profile: AccountProfile;
  public get role(): string{
    return this._role;
  }

  constructor(
    private cookieService: CookieService,
    private api: ApiFacade,
    private router: Router
  ) { }

  get account(): Account {
    return this._account;
  }

  get hasLoggedIn(): boolean {
    return !!this.account;
  }

  get profile(): AccountProfile {
    return this._profile;
  }

  changeRole(role: string) {
    this._role = role.toLocaleLowerCase();
  }

  assureRole(role: string) {
    console.log(role, this.role);
    if(role !== this.role) {
      this.router.navigateByUrl('/');
    }
  }

  async login(account: Account, role: string): Promise<void> {
    this._account = account;
    this._profile = await this.api.accountProfileApi.get({accountId: account.id});
    this.accountSubject.next(account);
    const cookieValue = {
      account,
      role
    };
    this._role = role;
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
          this.login(account, obj.role);
          return;
        }
      }
    }

    this.logout();
  }

  getProfile(): Observable<AccountProfile> {
    const p = this.api.accountProfileApi.get({accountId: this.account.id});
    return Observable.fromPromise(p);
  }

  setLanguage(lang: string) {
    this.cookieService.set(langKey, lang);
  }

  getLanguage(): string {
    return this.cookieService.get(langKey) || 'en';
  }
}
