import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../../../types';
import * as uuid from 'uuid';

import { ApiService, ApiServiceFactory } from "../api.service";
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { ModalService } from '../modal.service';

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
  private accountApi: ApiService;

  constructor(apiServiceFactory: ApiServiceFactory,
    public modalService: ModalService,
    public activeModal: NgbActiveModal,
    private sessionService: SessionService,
    private router: Router) {
      this.accountApi = apiServiceFactory.produce("account");
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
        secret: this.password,
        type: null};

      const dup = await this.accountApi.get({name: model.name});
      if (dup){
        throw new Error('The account has be registered.');
      }
      const id = await this.accountApi.add(model);
      const account : Account = await this.accountApi.getOne(id);
      this.sessionService.login(account);
      this.modalService.dismissModal();
      const routeUrl = account.type === 'provider' ? 'provider' :
                      account.type === 'consumer' ? 'consumer' :
                      '';
      this.router.navigateByUrl(routeUrl);
      this.errorMessage = null;
      this.activeModal.dismiss();
    }catch (e){
      this.errorMessage = e.message;
      this.submitted = false;
    }
  }

  login(){
    this.activeModal.dismiss();
    this.modalService.openLoginModal();
    return false;
  }
}
