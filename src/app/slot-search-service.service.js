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
var notification_service_1 = require("./notification.service");
var session_service_1 = require("./session.service");
var Subject_1 = require("rxjs/Subject");
var api_service_1 = require("./api.service");
var SlotSearchServiceService = (function () {
    function SlotSearchServiceService(notificationService, sessionService, apiServiceFactory) {
        this.notificationService = notificationService;
        this.sessionService = sessionService;
        this.apiService = apiServiceFactory.produce('slot');
    }
    SlotSearchServiceService.prototype.search = function (query) {
        var _this = this;
        var consumerId = this.getConsumerId();
        var subject = new Subject_1.Subject();
        var q = this.convertToMongoQuery(query);
        this.apiService.list(q)
            .then(function (x) { return subject.next(x); })
            .catch(function (e) {
            _this.notificationService.error(e);
            subject.next();
        });
        return subject.asObservable();
    };
    SlotSearchServiceService.prototype.getConsumerId = function () {
        var account = this.sessionService.account;
        return account ? account.id : undefined;
    };
    SlotSearchServiceService.prototype.convertToMongoQuery = function (query) {
        var q = {};
        if (query.age) {
            q.ageFrom = {
                $lte: query.age
            };
            q.ageTo = {
                $gte: query.age
            };
        }
        if (query.start) {
            q.start = {
                $lte: new Date(query.start)
            };
        }
        if (query.end) {
            q.end = {
                $gte: new Date(query.end)
            };
        }
        if (query.gender !== undefined) {
            q.gender = {
                $eq: query.gender
            };
        }
        return q;
    };
    SlotSearchServiceService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [notification_service_1.NotificationService,
            session_service_1.SessionService,
            api_service_1.ApiServiceFactory])
    ], SlotSearchServiceService);
    return SlotSearchServiceService;
}());
exports.SlotSearchServiceService = SlotSearchServiceService;
//# sourceMappingURL=slot-search-service.service.js.map