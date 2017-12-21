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
var uuid = require("uuid");
var GenericRepoFactory = /** @class */ (function () {
    function GenericRepoFactory(dbPromise) {
        this.dbPromise = dbPromise;
    }
    GenericRepoFactory.prototype.produce = function (typeName) {
        return new GenericDataGateway(this.dbPromise, typeName);
    };
    return GenericRepoFactory;
}());
exports.GenericRepoFactory = GenericRepoFactory;
var GenericDataGateway = /** @class */ (function () {
    function GenericDataGateway(dbPromise, collectionName) {
        this.dbPromise = dbPromise;
        this.collectionName = collectionName;
    }
    GenericDataGateway.prototype.getCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dbPromise];
                    case 1:
                        db = _a.sent();
                        return [2 /*return*/, db.collection(this.collectionName)];
                }
            });
        });
    };
    GenericDataGateway.prototype.get = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var array;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query({
                            id: id
                        }, 1)];
                    case 1:
                        array = _a.sent();
                        if (array && array.length === 1) {
                            return [2 /*return*/, array[0]];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    GenericDataGateway.prototype.list = function (limit, sort) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query({}, limit, sort)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GenericDataGateway.prototype.create = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var created;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        item.id = item.id || uuid.v4();
                        return [4 /*yield*/, this.upsert(item, true)];
                    case 1:
                        created = _a.sent();
                        return [2 /*return*/, created.id];
                }
            });
        });
    };
    GenericDataGateway.prototype.update = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!item.id) {
                            throw new Error("To update an object, id must be specified.");
                        }
                        return [4 /*yield*/, this.upsert(item, false)];
                    case 1:
                        updated = _a.sent();
                        return [2 /*return*/, updated];
                }
            });
        });
    };
    GenericDataGateway.prototype.merge = function (id, delta) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, option, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        option = {
                            upsert: false
                        };
                        delete delta['_id'];
                        return [4 /*yield*/, collection.updateOne({ id: id }, { $set: delta }, option)];
                    case 2:
                        result = _a.sent();
                        if (result.modifiedCount === 0) {
                            throw new Error("Cannot merge because target object doesn't exist (id:" + id + ")");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GenericDataGateway.prototype.upsert = function (item, upsert) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, option, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        option = {
                            upsert: upsert
                        };
                        delete item['_id'];
                        return [4 /*yield*/, collection.updateOne({
                                id: item.id
                            }, item, option)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, item];
                }
            });
        });
    };
    GenericDataGateway.prototype.queryOne = function (query, sort) {
        if (sort === void 0) { sort = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.find(query)
                                .sort(sort)
                                .limit(1)
                                .toArray()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.length ? result[0] : null];
                }
            });
        });
    };
    GenericDataGateway.prototype.query = function (query, limit, sort) {
        if (limit === void 0) { limit = 1000; }
        if (sort === void 0) { sort = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        console.log('Mongo query:', this.collectionName, query);
                        return [4 /*yield*/, collection.find(query)
                                .sort(sort)
                                .limit(limit)
                                .toArray()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    GenericDataGateway.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.deleteOne({
                                id: id
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return GenericDataGateway;
}());
//# sourceMappingURL=genericDataGateway.js.map