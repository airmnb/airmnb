import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Account, LoginInfo } from '../../types';
import { Observable } from 'rxjs/Rx';

// environment.apiUrl is like http://localhost:3000/api/
const API_URL_BASE = environment.apiUrl.replace(/\/$/, "");

export interface ApiService<T> {

  add(item: T): Promise<string>;

  delete(id: string): Promise<void>;
  update(item: T, id?: string): Promise<void> ;

  updateFunc(id: string, func: (item: T) => T): Promise<void>;

  merge(id: string, delta: any): Promise<void> ;
  getOne(id: string): Promise<T>;

  get(query: any): Promise<T> ;

  list(query: any): Promise<T[]>;
}

class ApiServiceImpl<T> implements ApiService<T> {
  private apiUrl: string;
  constructor(private name: string, private http: Http) {
    this.apiUrl = API_URL_BASE + '/data/' + name;
   }

  public async add(item: T): Promise<string> {
    const resp = await this.http.post(this.apiUrl, item).toPromise();
    const body = resp.json();
    if (resp.status === 201) {
      return body;
    } else {
      throw new Error(body);
    }
  }

  public async delete(id: string): Promise<void> {
    const resp = await this.http.delete(this.apiUrl + '/' + id).toPromise();
    if (resp.status === 200) {
      return;
    } else {
      throw new Error(resp.text());
    }
  }

  public async update(item: T, id?: string): Promise<void> {
    const itemId = id || item['id'];
    if(!itemId) {
      throw new Error("'id' isn't specified for update() method.");
    }
    const resp = await this.http.put(this.apiUrl + '/' + itemId, item).toPromise();
    const body = resp.json();
    if (resp.status === 200) {
      return body;
    } else {
      throw new Error(body);
    }
  }

  public async updateFunc(id: string, func: (item: T) => T): Promise<void> {
    let item = await this.getOne(id);
    item = func(item);
    const result = await this.update(item, id);
  }

  public async merge(id: string, delta: any): Promise<void> {
    await this.updateFunc(id, item => Object.assign(item, delta));
  }

  public async getOne(id: string): Promise<T> {
    const resp = await this.http.get(this.apiUrl + '/' + id).toPromise();
    const body = resp.json();
    if (resp.status === 200) {
      return body;
    } else {
      throw new Error(body);
    }
  }

  public async get(query: any): Promise<T> {
    const resp = await this.http.get(this.apiUrl, {params: query}).toPromise();
    const body = resp.json();
    if (resp.status === 200) {
      return body;
    } else {
      throw new Error(body);
    }
  }

  public async list(query: any): Promise<T[]> {
    const resp = await this.http.post(this.apiUrl + '/list', query).toPromise();
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
  private pool = new Map<string, any>();
  constructor(private http: Http) { }

  public produce<T>(name: string): ApiService<T> {
    let service: ApiService<T> = this.pool.get(name);
    if (!service){
      service = new ApiServiceImpl<T>(name, this.http);
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
    const resp = await this.http.post(this.apiUrl, info).toPromise();
    if (resp.status === 200){
      const json = resp.text();
      return JSON.parse(json);
    }else{
      return null;
    }
  }
}

