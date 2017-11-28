import { Component, OnInit } from '@angular/core';
import { Account, LoginInfo } from '../../../types';
import { LoginService } from '../api.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'amb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private submitted: boolean;
  model: LoginInfo = {name: null, password: null};

  constructor(private loginService: LoginService, private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;
    try{
      const account = await this.loginService.login(this.model);
      this.sessionService.account = account;
      const routeUrl = account.type === 'provider' ? 'provider' :
      account.type === 'consumer' ? 'consumer' :
      '';
this.router.navigateByUrl(routeUrl);
    }catch (e){
      console.log(e);
      this.submitted = false;
    }
  }
}
