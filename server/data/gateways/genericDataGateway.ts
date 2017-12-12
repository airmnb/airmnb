import * as mongo from 'mongodb';
import * as uuid from 'uuid';

export interface IGenericDataGateway {
  list(limit ?: number, sort ?: any): Promise < any[] > ;
  get(id: string): Promise < any > ;
  queryOne(query: any, sort ?: any): Promise<any>;
  query(query: any, limit ?: number, sort ?: any): Promise < any[] > ;
  create(item: any): Promise < string > ;
  update(item: any): Promise < any > ;
  merge(id: string, delta: any): Promise<void>;
  delete(id: string): Promise < void > ;
}

export class GenericRepoFactory {
  constructor(private dbPromise: Promise < mongo.Db >) {}

  produce(typeName: string): IGenericDataGateway{
    return new GenericDataGateway(this.dbPromise, typeName);
  }
}

class GenericDataGateway implements IGenericDataGateway {
  constructor(private dbPromise: Promise < mongo.Db > , private collectionName: string) {}

  private async getCollection(): Promise < mongo.Collection > {
    const db = await this.dbPromise;
    return db.collection(this.collectionName);
  }

  async get(id: string): Promise < any > {
    const array = await this.query({
      id: id
    }, 1);
    if (array && array.length === 1) {
      return <any > array[0];
    }
    return null;
  }

  async list(limit ?: number, sort ?: any): Promise < any[] > {
    return await this.query({}, limit, sort);
  }

  async create(item: any): Promise < string > {
    item.id = item.id || uuid.v4();
    const created = await this.upsert(item, true);
    return created.id;
  }

  async update(item: any): Promise < any > {
    if (!item.id) {
      throw new Error(`To update an object, id must be specified.`);
    }
    const updated = await this.upsert(item, false);
    return updated;
  }

  async merge(id: string, delta: any): Promise<void>{
    const collection = await this.getCollection();
    const option: mongo.ReplaceOneOptions = {
      upsert: false
    };
    delete delta['_id'];
    const result = await collection.updateOne({id}, {$set: delta}, option);
    if (result.modifiedCount === 0){
      throw new Error(`Cannot merge because target object doesn't exist (id:${id})`);
    }
  }

  private async upsert(item: any, upsert: boolean): Promise < any > {
    const collection = await this.getCollection();
    const option: mongo.ReplaceOneOptions = {
      upsert
    };
    delete item['_id'];
    const result = await collection.updateOne({
      id: item.id
    }, item, option);
    return item;
  }

  async queryOne(query: any, sort: any = {}): Promise < any[] > {
    const collection = await this.getCollection();
    const result = await collection.find(query)
      .sort(sort)
      .limit(1)
      .toArray();
    return result.length ? result[0] : null;
  }

  async query(query: any, limit: number = 1000, sort: any = {}): Promise < any[] > {
    const collection = await this.getCollection();
    console.log('Mongo query:', this.collectionName, query);
    const result = await collection.find(query)
      .sort(sort)
      .limit(limit)
      .toArray();
    return <any[] > result;
  }

  async delete(id: string): Promise < void > {
    const collection = await this.getCollection();
    await collection.deleteOne({
      id
    });
  }
}
