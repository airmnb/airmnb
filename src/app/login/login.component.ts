import { Component, OnInit } from '@angular/core';
import { Account, LoginInfo } from '../../../types';
import { LoginService } from '../api.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private submitted: boolean;
  model: LoginInfo = {name: null, password: null};

  constructor(private loginService: LoginService, private sessionService: SessionService) { }

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;
    try{
      const account = await this.loginService.login(this.model);
      this.sessionService.account = account;
    }catch (e){
      console.log(e);
    }
  }
}
