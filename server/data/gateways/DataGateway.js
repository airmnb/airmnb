"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongo = require("mongodb");
var uuid = require("uuid");
var connectionString = process.env.AMB_MONGO_DB_CONNECTION_STRING;
var dbPromise = mongo.MongoClient.connect(connectionString);
// Ensure index
dbPromise.then(function (db) { return db.collection("slot").ensureIndex({ locationMongoGeo: "2dsphere" }); });
var DataGateway = /** @class */ (function () {
    function DataGateway(collectionName) {
        this.collectionName = collectionName;
    }
    DataGateway.prototype.getCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dbPromise];
                    case 1:
                        db = _a.sent();
                        return [2 /*return*/, db.collection(this.collectionName)];
                }
            });
        });
    };
    DataGateway.prototype.getLatest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var array, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query({ id: id }, 1)];
                    case 1:
                        array = _a.sent();
                        result = array.length === 1 ? array[0] : null;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    DataGateway.prototype.getAll = function (id, limit) {
        if (limit === void 0) { limit = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query({ id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DataGateway.prototype.getAllDuring = function (id, start, end) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            id: id,
                            mlog_timestamp: {
                                $gte: start.valueOf()
                            }
                        };
                        if (end) {
                            query = Object.assign(query, { mlog_timestamp: { $lte: end.valueOf } });
                        }
                        return [4 /*yield*/, this.query(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DataGateway.prototype.add = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var isNew, task;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isNew = !item.id;
                        Object.assign(item, {
                            id: item.id || uuid.v4(),
                        });
                        return [4 /*yield*/, this.addObject(item)];
                    case 1:
                        task = _a.sent();
                        return [2 /*return*/, item.id];
                }
            });
        });
    };
    DataGateway.prototype.addObject = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, option;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        option = {
                            upsert: true
                        };
                        return [4 /*yield*/, collection.updateOne({ id: item.id }, item, option)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, item.id];
                }
            });
        });
    };
    DataGateway.prototype.query = function (query, limit) {
        if (limit === void 0) { limit = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            var collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.find(query)
                                .sort({
                                mlog_timestamp: -1
                            })
                                .limit(limit)
                                .toArray()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return DataGateway;
}());
exports.DataGateway = DataGateway;
var DataGatewayBase = /** @class */ (function () {
    function DataGatewayBase(collectionName) {
        this.repoInternal = new DataGateway(collectionName);
    }
    DataGatewayBase.prototype.repo = function () {
        return this.repoInternal;
    };
    DataGatewayBase.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo().getLatest(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DataGatewayBase.prototype.gegAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo().query({})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DataGatewayBase.prototype.update = function (id, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item.id = id;
                        return [4 /*yield*/, this.repo().add(item)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    DataGatewayBase.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo().add(item)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DataGatewayBase.prototype.query = function (query, limit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repo().query(query, limit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DataGatewayBase;
}());
exports.DataGatewayBase = DataGatewayBase;
//# sourceMappingURL=DataGateway.js.map