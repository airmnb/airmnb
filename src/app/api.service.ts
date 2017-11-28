import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Account, LoginInfo } from '../../types';
import { Observable } from 'rxjs/Observable';

// environment.apiUrl is like http://localhost:3000/api/
const API_URL_BASE = environment.apiUrl.replace(/\/$/, "");

@Injectable()
export class ApiService {
  private apiUrl: string;
  constructor(private name: string, private http: Http) {
    this.apiUrl = API_URL_BASE + '/data/' + name;
   }

  public async add(item): Promise<Response> {
    return await this.http.post(this.apiUrl, item).toPromise();
  }
}

@Injectable()
export class ApiServiceFactory {
  private pool = new Map<string, ApiService>();
  constructor(private http: Http) { }

  public produce(name: string): ApiService {
    let service = this.pool.get(name);
    if (!service){
      service = new ApiService(name, this.http);
      this.pool.set(name, service);
    }
    return service;
  }
}

@Injectable()
export class LoginService {
  private apiUrl: string;
  constructor(private http: Http) {
    this.apiUrl = API_URL_BASE + '/login';
   }

  public async login(info: LoginInfo): Promise<Account> {
    console.log('login info', info);
    const resp = await this.http.post(this.apiUrl, info).toPromise();
    if (resp.status === 200){
      const json = resp.text();
      return JSON.parse(json);
    }else{
      return null;
    }
  }
}

