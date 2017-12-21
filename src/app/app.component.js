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
var session_service_1 = require("./session.service");
var router_1 = require("@angular/router");
var modal_service_1 = require("./modal.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(modalService, sessionService, router) {
        this.modalService = modalService;
        this.sessionService = sessionService;
        this.router = router;
        this.title = 'Air Mom & Baby';
        this.language = 'en';
        this.accountName = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.sessionService.loadCookie();
    };
    AppComponent.prototype.signup = function () {
        this.modalService.openSignupModal();
        return false;
    };
    Object.defineProperty(AppComponent.prototype, "hasLoggedIn", {
        get: function () {
            return !!this.sessionService.account;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.login = function () {
        if (!this.hasLoggedIn) {
            this.modalService.openLoginModal();
        }
        return false;
    };
    AppComponent.prototype.goTransactions = function () {
        if (!this.hasLoggedIn) {
            return false;
        }
        this.router.navigate(['transactions']);
    };
    AppComponent.prototype.goProfile = function () {
        if (!this.hasLoggedIn) {
            return false;
        }
        this.router.navigateByUrl('profile');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'amb-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [modal_service_1.ModalService,
            session_service_1.SessionService,
            router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map