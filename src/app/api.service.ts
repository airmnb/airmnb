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

  public async add(item): Promise<string> {
    const resp = await this.http.post(this.apiUrl, item).toPromise();
    const body = resp.json();
    if (resp.status === 201) {
      return body;
    } else {
      throw new Error(body);
    }
  }

  public async getOne(id: string): Promise<any> {
    const resp = await this.http.get(this.apiUrl + '/' + id).toPromise();
    const body = resp.json();
    if (resp.status === 200) {
      return body;
    } else {
      throw new Error(body);
    }
  }

  public async get(query: any): Promise<any> {
    const resp = await this.http.get(this.apiUrl, {params: query}).toPromise();
    const body = resp.json();
    if (resp.status === 200) {
      return body;
    } else {
      throw new Error(body);
    }
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

