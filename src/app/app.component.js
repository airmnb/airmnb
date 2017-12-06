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
var AppComponent = (function () {
    function AppComponent(sessionService, router) {
        var _this = this;
        this.sessionService = sessionService;
        this.router = router;
        this.title = 'Air Mom & Baby';
        this.language = 'en';
        this.unknownUser = true;
        this.accountName = null;
        this.sessionService.getAccount().subscribe(function (account) {
            if (account) {
                _this.accountName = account.name;
                _this.unknownUser = false;
                if (account.type === 'provider') {
                    _this.router.navigateByUrl('provider');
                }
                else if (account.type === 'consumer') {
                    _this.router.navigateByUrl('consumer');
                }
            }
            else {
                _this.accountName = null;
                _this.unknownUser = true;
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this.sessionService.loadCookie();
    };
    AppComponent.prototype.logout = function () {
        this.sessionService.logout();
        this.router.navigateByUrl('/');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'amb-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [session_service_1.SessionService, router_1.Router])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map