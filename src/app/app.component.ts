import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ModalService } from './modal.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'amb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  options: FormGroup;


  title = 'Air Mom & Baby';
  language = 'en';
  accountName = null;
  private _mobileQueryListener: () => void;

  constructor(
    private modalService: ModalService,
    private sessionService: SessionService,
    private router: Router,
    fb: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

      this.options = fb.group({
        'fixed': false,
        'top': 0,
        'bottom': 0,
      });
  }

  mobileQuery: MediaQueryList;


  ngOnInit(): void {
    this.sessionService.loadCookie();
  }


  signup() {
    this.modalService.openSignupModal();
    return false;
  }

  get hasLoggedIn(): boolean {
    return !!this.sessionService.account;
  }

  login() {
    if(!this.hasLoggedIn) {
      this.modalService.openLoginModal();
    }
    return false;
  }

  goTransactions() {
    if(!this.hasLoggedIn) {
      return false;
    }
    this.router.navigate(['transactions']);
  }

  goProfile() {
    if(!this.hasLoggedIn) {
      return false;
    }
    this.router.navigateByUrl('profile');
  }
}
