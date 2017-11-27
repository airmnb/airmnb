"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = require("mongodb");
var genericDataGateway_1 = require("./genericDataGateway");
var accountGateway_1 = require("./gateways/accountGateway");
exports.account = accountGateway_1.accountGateway;
var connectionString = process.env.AMB_MONGO_DB_CONNECTION_STRING;
var dbPromise = mongo.MongoClient.connect(connectionString);
exports.dataGatewayFactory = new genericDataGateway_1.GenericRepoFactory(dbPromise);
//# sourceMappingURL=gateway.js.map