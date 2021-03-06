import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { CookieService } from 'ngx-cookie-service';
import { ApiFacade } from './apiFacade';
import { UtilService } from './util.service';

const cookieKey = 'c';
const langKey = 'lang';

@Injectable()
export class SessionService {
  private accountSubject = new Subject<MnbAccount>();
  private _account: MnbAccount;
  private _role: MnbRole;
  private _profile: AccountProfile;
  private _locale: string;

  public get role(): MnbRole{
    return this._role;
  }

  constructor(
    private cookieService: CookieService,
    private api: ApiFacade,
    private router: Router,
    private translate: TranslateService,
    private util: UtilService
  ) {
  }

  getLocale(): string {
    return this._locale || 'en';
  }

  setLocale(value: string) {
    this._locale = value;
    this.saveCookie();
    this.translate.use(value);
    console.log('Locale change to ', value);
  }

  get account(): MnbAccount {
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
    return this.role == MnbRole.Provider;
  }

  get isConsumer(): boolean {
    // tslint:disable-next-line:triple-equals
    return this.role == MnbRole.Consumer;
  }

  changeRole(role: MnbRole) {
    this._role = role;
    this.saveCookie();
    this.router.navigateByUrl('/');
  }

  assureRole(role: MnbRole) {
    // tslint:disable-next-line:triple-equals
    if(!this.hasLoggedIn || role != this.role) {
      console.log(`Expected ${JSON.stringify(role)}, but you are ${JSON.stringify(this.role)}`);
      this.router.navigateByUrl('/');
    }
  }

  async login(account: MnbAccount, role: MnbRole): Promise<void> {
    this._account = account;
    this._role = role;
    this._profile = await this.api.accountProfileApi.get({accountId: account.id});
    this.accountSubject.next(account);
    this.saveCookie();
  }

  refreshProfile() {
    if(!this.hasLoggedIn) throw new Error('The user has signed out.');
    this.login(this._account, this._role);
  }

  async logout() {
    console.log('Session login');
    this._account = null;
    this._role = null;
    this._profile = null;
    // await this.authService.signOut();
    this.accountSubject.next(null);
    this.cookieService.deleteAll('/');
  }

  loadCookie(): void {
    const cookieValue = this.cookieService.get(cookieKey);
    if (cookieValue) {
      const obj = JSON.parse(cookieValue);
      if (obj) {
        const account = obj.account;
        this.setLocale(obj.locale);
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
      role: this._role,
      locale: this._locale
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


  get shouldUseGoogleMap(): boolean {
    return !this.util.isInTheGreatWall; // !this._profile || !this._profile.preferredMap || this._profile.preferredMap === 'google';
  }

  get shouldUseGaodeMap(): boolean {
    return this.util.isInTheGreatWall; // || (this._profile && this._profile.preferredMap === 'gaode');
  }
}
