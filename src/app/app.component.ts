import { Component, OnInit } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { ModalService } from './modal.service';

@Component({
  selector: 'amb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {


  title = 'Air Mom & Baby';
  language = 'en';
  accountName = null;

  constructor(
    private modalService: ModalService,
    private sessionService: SessionService,
    private router: Router){
    this.sessionService.getAccount().subscribe(account => {
      if(account) {
        this.accountName = account.name;
        if (account.type === 'provider'){
          this.router.navigateByUrl('provider');
        }else if (account.type === 'consumer'){
          this.router.navigateByUrl('consumer');
        }
      } else {
        this.accountName = null;
      }
    });
  }

  ngOnInit(): void {
    this.sessionService.loadCookie();
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigateByUrl('/');
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
