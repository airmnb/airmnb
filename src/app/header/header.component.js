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
var session_service_1 = require("../session.service");
var router_1 = require("@angular/router");
var types_1 = require("../../../types");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(session, router) {
        this.session = session;
        this.router = router;
    }
    Object.defineProperty(HeaderComponent.prototype, "hasLoggedIn", {
        get: function () {
            return !!this.accountName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "isProvider", {
        get: function () {
            return this.hasLoggedIn && this.session.role === types_1.Role.Provider;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "role", {
        get: function () {
            return this.session.role;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "isConsumer", {
        get: function () {
            return this.hasLoggedIn && this.session.role === types_1.Role.Consumer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderComponent.prototype, "accountName", {
        get: function () {
            return this.session.account ? this.session.account.name : null;
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.selectLanguage = function (lang) {
        this.session.setLanguage(lang);
    };
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.logout = function () {
        this.session.logout();
        this.router.navigateByUrl('/');
    };
    HeaderComponent.prototype.switchToProvider = function () {
        this.session.changeRole(types_1.Role.Provider);
    };
    HeaderComponent.prototype.switchToConsumer = function () {
        this.session.changeRole(types_1.Role.Consumer);
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'amb-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css']
        }),
        __metadata("design:paramtypes", [session_service_1.SessionService,
            router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map