import { Component, OnInit } from '@angular/core';
import { Account } from '../../../types';
import * as uuid from 'uuid';

import { ApiService, ApiServiceFactory } from "../api.service";
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private accountApi: ApiService;
  constructor(apiServiceFactory: ApiServiceFactory, private sessionService: SessionService, private router: Router) {
    this.accountApi = apiServiceFactory.produce("account");
   }

  model: Account = {id: uuid.v4(), name: null, email: null, enabled: true, secret: null, type: null};
  submitted = false;

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;
    try{
      const dup = await this.accountApi.get({name: this.model.name});
      if (dup){
        throw new Error('The account has be registered.');
      }
      const id = await this.accountApi.add(this.model);
      const account : Account = await this.accountApi.getOne(id);
      this.sessionService.login(account);
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
