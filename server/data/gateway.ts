import * as mongo from 'mongodb';
import { GenericRepoFactory } from './gateways/genericDataGateway';
import { accountGateway } from './gateways/accountGateway';

export const account = accountGateway;

const connectionString = process.env.AMB_MONGO_DB_CONNECTION_STRING;
const dbPromise = mongo.MongoClient.connect(connectionString);

export const dataGatewayFactory = new GenericRepoFactory(dbPromise);
