import { Component, OnInit } from '@angular/core';
import { Account } from '../../../types';
import * as uuid from 'uuid';

import { ApiService, ApiServiceFactory } from "../api.service";
import { Http } from '@angular/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private apiService: ApiService;
  constructor(apiServiceFactory: ApiServiceFactory) {
    this.apiService = apiServiceFactory.produce("account");
   }

  model: Account = {id: uuid.v4(), name: null, email: null, enabled: true, secret: null, type: null};
  submitted = false;

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;
    try{
      await this.apiService.add(this.model);
      this.submitted = false;
    }catch (e){
      console.log(e);
    }
  }
}
