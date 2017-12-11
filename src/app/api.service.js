"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var core_1 = require("@angular/core");
var environment_1 = require("../environments/environment");
var http_1 = require("@angular/http");
// environment.apiUrl is like http://localhost:3000/api/
var API_URL_BASE = environment_1.environment.apiUrl.replace(/\/$/, "");
var ApiService = (function () {
    function ApiService(name, http) {
        this.name = name;
        this.http = http;
        this.apiUrl = API_URL_BASE + '/data/' + name;
    }
    ApiService.prototype.add = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.post(this.apiUrl, item).toPromise()];
                    case 1:
                        resp = _a.sent();
                        body = resp.json();
                        if (resp.status === 201) {
                            return [2 /*return*/, body];
                        }
                        else {
                            throw new Error(body);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.delete(this.apiUrl + '/' + id).toPromise()];
                    case 1:
                        resp = _a.sent();
                        if (resp.status === 200) {
                            return [2 /*return*/];
                        }
                        else {
                            throw new Error(resp.text());
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.update = function (item, id) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, resp, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = id || item['id'];
                        if (!itemId) {
                            throw new Error("'id' isn't specified for update() method.");
                        }
                        return [4 /*yield*/, this.http.put(this.apiUrl + '/' + id, item).toPromise()];
                    case 1:
                        resp = _a.sent();
                        body = resp.json();
                        if (resp.status === 200) {
                            return [2 /*return*/, body];
                        }
                        else {
                            throw new Error(body);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.getOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.apiUrl + '/' + id).toPromise()];
                    case 1:
                        resp = _a.sent();
                        body = resp.json();
                        if (resp.status === 200) {
                            return [2 /*return*/, body];
                        }
                        else {
                            throw new Error(body);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.get = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.apiUrl, { params: query }).toPromise()];
                    case 1:
                        resp = _a.sent();
                        body = resp.json();
                        if (resp.status === 200) {
                            return [2 /*return*/, body];
                        }
                        else {
                            throw new Error(body);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiService.prototype.list = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.http.get(this.apiUrl + '/list', { params: query }).toPromise()];
                    case 1:
                        resp = _a.sent();
                        body = resp.json();
                        if (resp.status === 200) {
                            return [2 /*return*/, body];
                        }
                        else {
                            throw new Error(body);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [String, http_1.Http])
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
var ApiServiceFactory = (function () {
    function ApiServiceFactory(http) {
        this.http = http;
        this.pool = new Map();
    }
    ApiServiceFactory.prototype.produce = function (name) {
        var service = this.pool.get(name);
        if (!service) {
            service = new ApiService(name, this.http);
            this.pool.set(name, service);
        }
        return service;
    };
    ApiServiceFactory = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ApiServiceFactory);
    return ApiServiceFactory;
}());
exports.ApiServiceFactory = ApiServiceFactory;
var LoginService = (function () {
    function LoginService(http) {
        this.http = http;
        this.apiUrl = API_URL_BASE + '/login';
    }
    LoginService.prototype.login = function (info) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('login info', info);
                        return [4 /*yield*/, this.http.post(this.apiUrl, info).toPromise()];
                    case 1:
                        resp = _a.sent();
                        if (resp.status === 200) {
                            json = resp.text();
                            return [2 /*return*/, JSON.parse(json)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=api.service.js.map