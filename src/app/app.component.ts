import {  Component,  OnInit,  ChangeDetectorRef} from '@angular/core';
import {  FormGroup,  FormBuilder} from '@angular/forms';
import {  Router, NavigationStart} from '@angular/router';
import {  MediaMatcher} from '@angular/cdk/layout';

import {TranslateService} from '@ngx-translate/core';

import {  SessionService} from './core/session.service';

@Component({
  selector: 'amb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  options: FormGroup;


  title = 'Air Mom & Baby';
  language = 'en';
  private _mobileQueryListener: () => void;

  get accountName(): string {
    return this.session.account ? this.session.account.displayName : null;
  }

  get hasLoggedIn(): boolean {
    return this.session.hasLoggedIn;
  }

  get isProvider(): boolean {
    return this.session.isProvider;
  }

  constructor(
    private session: SessionService,
    private router: Router,
    fb: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    translate: TranslateService
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });

    translate.setDefaultLang('en');

    // this.router.events
    // .filter(event => event instanceof NavigationStart)
    // .subscribe(x => {
    //   console.log('Router', x);
    //   console.log('Session', {
    //     account: this.session.account,
    //     role: this.session.role,
    //     profile: this.session.profile
    //   });
    // });
  }

  mobileQuery: MediaQueryList;

  ngOnInit(): void {
    this.session.loadCookie();
  }

  goTransactions() {
    if (!this.hasLoggedIn) {
      return false;
    }
    this.router.navigate(['transactions']);
  }

  goProfile() {
    if (!this.hasLoggedIn) {
      return false;
    }
    this.router.navigateByUrl('profile');
  }
}
