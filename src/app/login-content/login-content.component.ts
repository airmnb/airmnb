import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, SocialUser, GoogleLoginProvider } from 'angular4-social-login';

import { Account, AccountProfile, Role } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { LoginService } from '../core/api.service';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';
import { NotificationService } from '../core/notification.service';

@Component({
  selector: 'amb-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.css']
})
export class LoginContentComponent implements OnInit {

  @Input() accountName: string;
  password: string;
  role: Role;
  errorMessage: string;
  submitted: boolean;

  constructor(
    private loginService: LoginService,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private router: Router,
    private api: ApiFacade,
    private util: UtilService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(async user => {
      console.log('Google SSO user', user);

      if(!user) return;
      console.log("Google SSO user isn't null", user);
      const account = await this.getOrCreateAccountForSso(user);
      console.log('SSO account', account);
      await this.login(account.name, account.secret, Role.Consumer);
    });
  }

  async getOrCreateAccountForSso(user: SocialUser): Promise<Account> {
    let account = await this.api.accountApi.get({name: user.name});
    if(!account) {
      // Not existing account
      account = {
        id: this.util.newGuid(),
        name: user.name,
        secret: this.util.newGuid() + "@google", // Random fake password
        enabled: true,
        email: user.email
      };
      const accountId = await this.api.accountApi.add(account);
      account.id = accountId;
    }
    return account;
  }

  async onSubmit() {
    this.submitted = true;
    await this.login(this.accountName, this.password, this.role);
  }

  private async login(name: string, password: string, role: Role) {
    try{
      const account = await this.loginService.login({
        name,
        password,
        role
      });
      await this.sessionService.login(account, role);
      this.sessionService.getProfile().subscribe(p => this.routeByProfile(p));
    }catch (e){
      this.notificationService.error(e);
      this.submitted = false;
    }
  }

  private routeByProfile(p: AccountProfile) {
    if(p) {
      this.router.navigateByUrl("/");
    }else{
      this.notificationService.info("Please input your profile to continue the journey.");
      this.router.navigate(['/profile']);
    }
  }

  loginWithGoogle() {
    try{
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }catch(e) {
      console.log('loginWithGoogle', e);
    }
  }
}
