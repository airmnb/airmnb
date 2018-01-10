import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import * as uuid from 'uuid';

import { Account, Role } from '../../../types';
import { ApiFacade } from '../core/apiFacade';
import { SessionService } from '../core/session.service';
import { ApiService, ApiServiceFactory } from '../core/api.service';

@Component({
  selector: 'amb-signup-content',
  templateUrl: './signup-content.component.html',
  styleUrls: ['./signup-content.component.css']
})
export class SignupContentComponent implements OnInit {
  submitted = false;
  accountName: string;
  password: string;
  email: string;
  errorMessage: string;

  constructor(
    private api: ApiFacade,
    private sessionService: SessionService,
    private router: Router) {
    }

  ngOnInit() {
  }

  public async onSubmit() {
    this.submitted = true;
    try{
      const model: Account = {
        id: uuid.v4(),
        name: this.accountName,
        email: this.email,
        enabled: true,
        secret: this.password
      };

      const dup = await this.api.accountApi.get({name: model.name});
      if (dup){
        throw new Error('The account has be registered.');
      }
      const id = await this.api.accountApi.add(model);
      const account : Account = await this.api.accountApi.getOne(id);
      await this.sessionService.login(account, Role.Consumer);
      this.router.navigateByUrl("/");
      this.errorMessage = null;
    }catch (e){
      this.errorMessage = e.message;
      this.submitted = false;
    }
  }
}
