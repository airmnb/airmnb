import * as mongo from "mongodb";
import * as uuid from "uuid";

const connectionString = process.env.AMB_MONGO_DB_CONNECTION_STRING;
const dbPromise = mongo.MongoClient.connect(connectionString);

export interface IDataGateway <T> {
	getLatest(id: string): Promise < T > ;
	getAll(id: string): Promise < T[] > ;
	getAllDuring(id: string, start: Date, end?: Date): Promise<T[]>;
	add(item: T): Promise<string>;
	query(query: any, limit?: number): Promise < T[] > ;
}

export class DataGateway<T extends {id?: string}> implements IDataGateway<T> {
	constructor(private collectionName: string) { }

	private async getCollection(): Promise < mongo.Collection > {
		const db = await dbPromise;
		return db.collection(this.collectionName);
	}

	async getLatest(id: string): Promise < T > {
		const array = await this.query({id: id}, 1);
		const result = array.length === 1 ? array[0] : null;
		return <T > result;
	}

	async getAll(id: string, limit: number = 1000): Promise < T[] > {
		return await this.query({id: id});
	}

	async getAllDuring(id: string, start: Date, end?: Date): Promise<T[]> {
		let query = {
			id,
			mlog_timestamp: {
				$gte: start.valueOf()
			}
		};

    if (end) {
			query = Object.assign(query, {mlog_timestamp: {$lte: end.valueOf}});
		}

		return await this.query(query);
	}

	async add(item: T): Promise<string> {
		const isNew = !item.id;
		Object.assign(item, {
			id: item.id || uuid.v4(),
		});

		const task = await this.addObject(item);
		return item.id;
	}

	private async addObject(item: T): Promise<string> {
		const collection = await this.getCollection();
		const option: mongo.ReplaceOneOptions = {
			upsert: true
		};
		await collection.updateOne({id: item.id}, item, option);
		return item.id;
	}

	async query(query: any, limit: number = 1000): Promise < T[] > {
		const collection = await this.getCollection();
		const result = await collection.find(query)
			.sort({
				mlog_timestamp: -1
			})
			.limit(limit)
			.toArray();
		return <T[]> result;
	}
}

export abstract class DataGatewayBase<T extends {id?: string}> {
  private repoInternal: IDataGateway<T>;
  constructor(collectionName: string){
    this.repoInternal = new DataGateway<T>(collectionName);
  }
  protected repo(): IDataGateway<T> {
    return this.repoInternal;
  }
  async get(id: string): Promise<T> {
    return await this.repo().getLatest(id);
  }
  async gegAll(): Promise<T[]> {
    return await this.repo().query({});
  }
  async update(id: string, item: T): Promise<T> {
    item.id = id;
    await this.repo().add(item);
    return item;
  }
  async create(item: T): Promise<string> {
    return await this.repo().add(item);
  }
  async query(query: any, limit: number): Promise<T[]> {
    return await this.repo().query(query, limit);
  }
}
