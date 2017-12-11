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
var notification_service_1 = require("../notification.service");
var apiFacade_1 = require("../apiFacade");
var ProfileComponent = (function () {
    function ProfileComponent(api, sessionService, notificationService) {
        this.api = api;
        this.sessionService = sessionService;
        this.notificationService = notificationService;
        this.model = {
            id: null,
            firstName: '',
            lastName: '',
            email: '',
            address: {
                address: null,
                longitude: null,
                latitude: null
            },
            gender: null,
            age: {
                a23: false,
                a34: false,
                a45: false,
                a56: false
            },
            language: {
                english: true,
                chinese: true,
                japanese: false
            }
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var accountId = this.sessionService.account.id;
        this.api.providerProfileApi.get({ accountId: accountId })
            .then(function (p) { return _this.setModel(p); })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
    ProfileComponent.prototype.setModel = function (p) {
        if (!p) {
            return;
        }
        this.model.id = p.id,
            this.model.firstName = p.firstName;
        this.model.lastName = p.lastName;
        this.model.address = p.address;
        this.model.age.a23 = p.ageFrom <= 2 && 3 < p.ageTo;
        this.model.age.a34 = p.ageFrom <= 3 && 4 < p.ageTo;
        this.model.age.a45 = p.ageFrom <= 4 && 5 < p.ageTo;
        this.model.age.a56 = p.ageFrom <= 5 && 6 <= p.ageTo;
        this.model.language.english = p.languages.includes('en');
        this.model.language.chinese = p.languages.includes('ch');
        this.model.language.japanese = p.languages.includes('jp');
    };
    ProfileComponent.prototype.onSubmit = function () {
        var p = {
            id: this.model.id,
            dob: null,
            gender: null,
            accountId: this.sessionService.account.id,
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            address: this.model.address,
        };
        if (p.id) {
            this.api.providerProfileApi.update(p, p.id);
        }
        else {
            this.api.providerProfileApi.add(p);
        }
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'amb-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            session_service_1.SessionService,
            notification_service_1.NotificationService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map