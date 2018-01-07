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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var uuid = require("uuid");
var moment = require("moment");
var types_1 = require("../../types");
var platform_browser_1 = require("@angular/platform-browser");
var _ = require("underscore");
var core_2 = require("@ngx-translate/core");
var environment_1 = require("../environments/environment");
var UtilService = /** @class */ (function () {
    function UtilService(document, translate) {
        this.document = document;
        this.translate = translate;
    }
    UtilService.prototype.newGuid = function () {
        return uuid.v4();
    };
    UtilService.prototype.displayGender = function (gender) {
        // tslint:disable-next-line:triple-equals
        return gender == types_1.Gender.Boy ? 'Boy' :
            // tslint:disable-next-line:triple-equals
            gender == types_1.Gender.Girl ? 'Girl' :
                'Either';
    };
    UtilService.prototype.parseInputDateTime = function (date, time) {
        var input = date + " " + time; // YYYY-MM-dd HH:mm
        return moment(input).toDate();
    };
    UtilService.prototype.getHour = function (date) {
        var m = moment(date);
        return m.hour();
    };
    UtilService.prototype.getYearMonthDate = function (d) {
        var m = moment(d);
        m.hour(0).minute(0).second(0);
        return m.toDate();
    };
    UtilService.prototype.getDate = function (date) {
        var m = moment(date);
        m.hour(0).minute(0).second(0).millisecond(0);
        return m.toDate();
    };
    UtilService.prototype.getBookingDeepLinkUrl = function (bookingId) {
        var port = document.location.port;
        if (port && port === "80") {
            port = "";
        }
        else {
            port = ":" + port;
        }
        return document.location.protocol + "//" + document.location.hostname + port + "/booking/" + bookingId;
    };
    UtilService.prototype.deepEquals = function (x, y) {
        return _.isEqual(x, y);
    };
    Object.defineProperty(UtilService.prototype, "shouldUseGoogleMap", {
        get: function () {
            return environment_1.environment.mapProvider === 'google';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UtilService.prototype, "shouldUseGaodeMap", {
        get: function () {
            return environment_1.environment.mapProvider === 'gaode';
        },
        enumerable: true,
        configurable: true
    });
    UtilService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [Object, core_2.TranslateService])
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
//# sourceMappingURL=util.service.js.map