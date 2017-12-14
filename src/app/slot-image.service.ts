import { Injectable } from '@angular/core';
import { ApiServiceFactory, ApiService } from './api.service';
import { ProviderImage, ServiceSlot } from '../../types';
import * as uuid from 'uuid';
import { ApiFacade } from './apiFacade';

@Injectable()
export class ImageService {

  constructor(
    private api: ApiFacade
  ) {
  }

  public async getImageNamesForProvider(accountId: string): Promise<string[]> {
    const providerProfile = await this.api.accountProfileApi.get({accountId});
    return providerProfile ? providerProfile.imageNames || [] : [];
  }

  public async saveImageNameForProvider(imageName: string, accountId: string): Promise<void> {
    const providerProfile = await this.api.accountProfileApi.get({accountId});
    providerProfile.imageNames = providerProfile ? providerProfile.imageNames || [] : [];
    providerProfile.imageNames.push(imageName);
    await this.api.accountProfileApi.update(providerProfile, providerProfile.id);
  }

  public getImageUrls(imageNames: string[]): string[] {
    return (imageNames || []).map(x => this.getImageUrl(x));
  }

  public getImageUrl(imageName: string): string {
    return imageName ? '/image/' + imageName : null;
  }
}
