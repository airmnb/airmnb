import { Injectable } from '@angular/core';
import { Account, AccountProfile, Role } from "../../types";
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
  private _role: Role;
  private _profile: AccountProfile;
  public get role(): Role{
    return this._role;
  }

  constructor(
    private cookieService: CookieService,
    private api: ApiFacade,
    private router: Router
  ) {
  }

  get account(): Account {
    return this._account;
  }

  get hasLoggedIn(): boolean {
    return !!this.account;
  }

  get profile(): AccountProfile {
    return this._profile;
  }

  get isProvider(): boolean {
    // tslint:disable-next-line:triple-equals
    return this.role == Role.Provider;
  }

  get isConsumer(): boolean {
    // tslint:disable-next-line:triple-equals
    return this.role == Role.Consumer;
  }

  changeRole(role: Role) {
    this._role = role;
    this.saveCookie();
    this.router.navigateByUrl('/');
  }

  assureRole(role: Role) {
    // tslint:disable-next-line:triple-equals
    if(!this.hasLoggedIn || role != this.role) {
      console.log(`Expected ${JSON.stringify(role)}, but you are ${JSON.stringify(this.role)}`);
      this.router.navigateByUrl('/');
    }
  }

  async login(account: Account, role: Role): Promise<void> {
    this._account = account;
    this._role = role;
    this._profile = await this.api.accountProfileApi.get({accountId: account.id});
    this.accountSubject.next(account);
    this.saveCookie();
  }

  logout(): void {
    console.log('Session login');
    this._account = null;
    this._role = null;
    this._profile = null;
    this.accountSubject.next(null);
    this.cookieService.delete(cookieKey, '/');
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

  saveCookie() {
    const value = {
      account: this.account,
      role: this._role
    };
    this.cookieService.set(cookieKey, JSON.stringify(value), null, '/');
  }

  getProfile(): Observable<AccountProfile> {
    const p = this.api.accountProfileApi.get({accountId: this.account.id});
    return Observable.fromPromise(p);
  }

  setLanguage(lang: string) {
    // this.cookieService.set(langKey, lang);
  }

  getLanguage(): string {
    return this.cookieService.get(langKey) || 'en';
  }
}
