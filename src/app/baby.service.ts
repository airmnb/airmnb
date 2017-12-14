import { Injectable } from '@angular/core';
import { ApiFacade } from './apiFacade';
import { BabyProfile } from '../../types';

@Injectable()
export class BabyService {

  constructor(
    private api: ApiFacade
  ) { }

  async ListAllBabies(babyIds?: string[]): Promise<BabyProfile[]> {
    const query = babyIds && babyIds.length ? {id: {$in: babyIds}} : null;
    return await this.api.babyProfileApi.list(query);
  }

}
