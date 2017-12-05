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
var SessionService = (function () {
    function SessionService() {
    }
    Object.defineProperty(SessionService.prototype, "isLoggedIn", {
        get: function () {
            return this.account != null && this.account.enabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionService.prototype, "isProvider", {
        get: function () {
            return this.isLoggedIn && this.account.type === 'provider';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SessionService.prototype, "isConsumer", {
        get: function () {
            return this.isLoggedIn && this.account.type === 'consumer';
        },
        enumerable: true,
        configurable: true
    });
    SessionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SessionService);
    return SessionService;
}());
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map