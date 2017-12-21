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
var Subject_1 = require("rxjs/Subject");
var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this.infoSubject = new Subject_1.Subject();
        this.errorSubject = new Subject_1.Subject();
    }
    NotificationService.prototype.info = function (info) {
        this.infoSubject.next(JSON.stringify(info));
    };
    NotificationService.prototype.getInfo = function () {
        return this.infoSubject.asObservable();
    };
    NotificationService.prototype.error = function (error) {
        this.errorSubject.next(error.toString() + error.stack);
    };
    NotificationService.prototype.getError = function () {
        return this.errorSubject.asObservable();
    };
    NotificationService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map