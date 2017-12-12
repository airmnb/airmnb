import { Injectable } from '@angular/core';
import { ApiFacade } from './apiFacade';
import { UtilService } from './util.service';

@Injectable()
export class TransactionService {

  constructor(
    private api: ApiFacade,
    private util: UtilService
  ) { }

  // async begin(bookingId: string): Promise<string>{

  // }

}
