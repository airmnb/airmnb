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
var AccountProfileComponent = /** @class */ (function () {
    function AccountProfileComponent(session) {
        this.session = session;
    }
    AccountProfileComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(AccountProfileComponent.prototype, "profileRole", {
        get: function () {
            return this.session.role;
        },
        enumerable: true,
        configurable: true
    });
    AccountProfileComponent = __decorate([
        core_1.Component({
            selector: 'amb-account-profile',
            templateUrl: './account-profile.component.html',
            styleUrls: ['./account-profile.component.css']
        }),
        __metadata("design:paramtypes", [session_service_1.SessionService])
    ], AccountProfileComponent);
    return AccountProfileComponent;
}());
exports.AccountProfileComponent = AccountProfileComponent;
//# sourceMappingURL=account-profile.component.js.map