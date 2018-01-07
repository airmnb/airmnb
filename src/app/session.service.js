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
var types_1 = require("../../types");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var Subject_1 = require("rxjs/Subject");
var Rx_1 = require("rxjs/Rx");
var apiFacade_1 = require("./apiFacade");
var router_1 = require("@angular/router");
var core_2 = require("@ngx-translate/core");
var angular4_social_login_1 = require("angular4-social-login");
var cookieKey = 'c';
var langKey = 'lang';
var SessionService = /** @class */ (function () {
    function SessionService(cookieService, api, router, translate, authService) {
        this.cookieService = cookieService;
        this.api = api;
        this.router = router;
        this.translate = translate;
        this.authService = authService;
        this.accountSubject = new Subject_1.Subject();
    }
    Object.defineProperty(SessionService.prototype, "role", {
        get: function () {
            return this._role;
        },
        enumerable: true,
        configurable: true
    });
    SessionService.prototype.getLocale = function () {
        return this._locale || 'en';
    };
    SessionService.prototype.setLocale = function (value) {
        this._locale = value;
        this.saveCookie();
        this.translate.use(value);
        console.log('Locale change to ', value);
    };
    Object.defineProperty(SessionService.prototype, "account", {
        get: function () {
            return this._account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionService.prototype, "hasLoggedIn", {
        get: function () {
            return !!this.account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionService.prototype, "profile", {
        get: function () {
            return this._profile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionService.prototype, "isProvider", {
        get: function () {
            // tslint:disable-next-line:triple-equals
            return this.role == types_1.Role.Provider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionService.prototype, "isConsumer", {
        get: function () {
            // tslint:disable-next-line:triple-equals
            return this.role == types_1.Role.Consumer;
        },
        enumerable: true,
        configurable: true
    });
    SessionService.prototype.changeRole = function (role) {
        this._role = role;
        this.saveCookie();
        this.router.navigateByUrl('/');
    };
    SessionService.prototype.assureRole = function (role) {
        // tslint:disable-next-line:triple-equals
        if (!this.hasLoggedIn || role != this.role) {
            console.log("Expected " + JSON.stringify(role) + ", but you are " + JSON.stringify(this.role));
            this.router.navigateByUrl('/');
        }
    };
    SessionService.prototype.login = function (account, role) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._account = account;
                        this._role = role;
                        _a = this;
                        return [4 /*yield*/, this.api.accountProfileApi.get({ accountId: account.id })];
                    case 1:
                        _a._profile = _b.sent();
                        this.accountSubject.next(account);
                        this.saveCookie();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Session login');
                        this._account = null;
                        this._role = null;
                        this._profile = null;
                        return [4 /*yield*/, this.authService.signOut()];
                    case 1:
                        _a.sent();
                        this.accountSubject.next(null);
                        this.cookieService.deleteAll('/');
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionService.prototype.getAccount = function () {
        return this.accountSubject.asObservable();
    };
    SessionService.prototype.loadCookie = function () {
        var cookieValue = this.cookieService.get(cookieKey);
        if (cookieValue) {
            var obj = JSON.parse(cookieValue);
            if (obj) {
                var account = obj.account;
                this.setLocale(obj.locale);
                if (account) {
                    this.login(account, obj.role);
                    return;
                }
            }
        }
        this.logout();
    };
    SessionService.prototype.saveCookie = function () {
        var value = {
            account: this.account,
            role: this._role,
            locale: this._locale
        };
        this.cookieService.set(cookieKey, JSON.stringify(value), null, '/');
    };
    SessionService.prototype.getProfile = function () {
        var p = this.api.accountProfileApi.get({ accountId: this.account.id });
        return Rx_1.Observable.fromPromise(p);
    };
    SessionService.prototype.setLanguage = function (lang) {
        // this.cookieService.set(langKey, lang);
    };
    SessionService.prototype.getLanguage = function () {
        return this.cookieService.get(langKey) || 'en';
    };
    SessionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngx_cookie_service_1.CookieService,
            apiFacade_1.ApiFacade,
            router_1.Router,
            core_2.TranslateService,
            angular4_social_login_1.AuthService])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map