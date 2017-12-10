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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var Subject_1 = require("rxjs/Subject");
var cookieKey = 'c';
var SessionService = (function () {
    function SessionService(cookieService) {
        this.cookieService = cookieService;
        this.accountSubject = new Subject_1.Subject();
    }
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
    SessionService.prototype.login = function (account) {
        this._account = account;
        this.accountSubject.next(account);
        var cookieValue = {
            account: account
        };
        var json = JSON.stringify(cookieValue);
        this.cookieService.set(cookieKey, json);
    };
    SessionService.prototype.logout = function () {
        this._account = null;
        this.accountSubject.next(null);
        this.cookieService.delete(cookieKey);
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
                if (account) {
                    this.login(account);
                    return;
                }
            }
        }
        this.logout();
    };
    SessionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ngx_cookie_service_1.CookieService])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map