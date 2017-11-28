import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Http, Response } from '@angular/http';
import { Account } from '../../types';
import { Observable } from 'rxjs/Observable';

const API_URL_BASE = environment.apiUrl.replace(/\/$/, "") + '/';

@Injectable()
export class ApiService {
  private apiUrl: string;
  constructor(private name: string, private http: Http) {
    this.apiUrl = API_URL_BASE + name;
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

