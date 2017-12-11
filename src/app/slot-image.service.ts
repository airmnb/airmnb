import { Injectable } from '@angular/core';
import { ApiServiceFactory, ApiService } from './api.service';
import { ProviderImage } from '../../types';
import * as uuid from 'uuid';
import { ApiFacade } from './apiFacade';

@Injectable()
export class ImageService {

  constructor(
    private api: ApiFacade
  ) {
  }

  public async getImageNamesForProvider(accountId: string): Promise<string[]> {
    const providerProfile = await this.api.providerProfileApi.get({accountId});
    return providerProfile.images || [];
  }

  public async saveImageNameForProvider(imageName: string, accountId: string): Promise<void> {
    const providerProfile = await this.api.providerProfileApi.get({accountId});
    providerProfile.images = providerProfile.images || [];
    providerProfile.images.push(imageName);
    await this.api.providerProfileApi.update(providerProfile, providerProfile.id);
  }

}
