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
var uuid = require("uuid");
var moment = require("moment");
var types_1 = require("../../types");
var UtilService = (function () {
    function UtilService() {
    }
    UtilService.prototype.newGuid = function () {
        return uuid.v4();
    };
    UtilService.prototype.displayGender = function (gender) {
        return gender === types_1.Gender.Boy ? 'Boy' :
            gender === types_1.Gender.Girl ? 'Girl' :
                'Either';
    };
    UtilService.prototype.getHourAndMinute = function (date) {
        var m = moment(date);
        return {
            hour: m.hour(),
            minute: m.minute()
        };
    };
    UtilService.prototype.getYearMonthDate = function (d) {
        var m = moment(d);
        return {
            year: m.year(),
            month: m.month() + 1,
            day: m.date()
        };
    };
    UtilService.prototype.getDate = function (d, t) {
        var m = moment();
        m.year(d.year).month(d.month - 1).date(d.day);
        if (t) {
            m.hour(t.hour).minute(t.minute);
        }
        var ret = m.toDate();
        return ret;
    };
    UtilService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map