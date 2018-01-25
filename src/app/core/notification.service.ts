import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotificationService {
  private infoSubject = new Subject<string>();
  private errorSubject = new Subject<string>();

  constructor() { }

  info(info): void {
    console.log('INFO', info);
    this.infoSubject.next(JSON.stringify(info));
  }

  getInfo(): Observable<string> {
    return this.infoSubject.asObservable();
  }

  error(error): void {
    console.log('ERROR', error);
    this.errorSubject.next(error.toString() + error.stack);
  }

  getError(): Observable<string> {
    return this.errorSubject.asObservable();
  }
}
