import { Injectable } from '@angular/core';
import { ApiServiceFactory, ApiService } from './api.service';
import { ProviderImage } from '../../types';
import * as uuid from 'uuid';

@Injectable()
export class SlotImageService {

  private api: ApiService;

  constructor(apiFactory: ApiServiceFactory) {
    this.api = apiFactory.produce("provider_image");
  }

  public async getImageNamesForProvider(providerId: string): Promise<string[]> {
    const list: ProviderImage[] = await this.api.list({providerId});
    return list.map(x => x.imageName);
  }

  public async saveImageNameForProvider(imageName: string, providerId: string): Promise<void> {
    const item: ProviderImage = {
      id: uuid.v4(),
      providerId,
      imageName
    };
    await this.api.add(item);
  }

}
