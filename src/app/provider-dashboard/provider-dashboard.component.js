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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var api_service_1 = require("../api.service");
var session_service_1 = require("../session.service");
var core_2 = require("@angular/core");
var date_fns_1 = require("date-fns");
var Subject_1 = require("rxjs/Subject");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var uuid = require("uuid");
var notification_service_1 = require("../notification.service");
var colors = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};
var ProviderDashboardComponent = (function () {
    function ProviderDashboardComponent(apiServiceFactory, modal, sessionService, router, notificationService) {
        var _this = this;
        this.modal = modal;
        this.sessionService = sessionService;
        this.router = router;
        this.notificationService = notificationService;
        this.uploadApiUrl = "/api/image/";
        this.images = [];
        this.view = 'month';
        this.viewDate = new Date();
        this.actions = [{
                label: '<i class="fa fa-fw fa-pencil"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.handleEvent('Edited', event);
                }
            },
            {
                label: '<i class="fa fa-fw fa-times"></i>',
                onClick: function (_a) {
                    var event = _a.event;
                    _this.events = _this.events.filter(function (iEvent) { return iEvent !== event; });
                    _this.handleEvent('Deleted', event);
                }
            }
        ];
        this.refresh = new Subject_1.Subject();
        this.events = [];
        this.activeDayIsOpen = true;
        this.slotApi = apiServiceFactory.produce("slot");
        this.providerImageApi = apiServiceFactory.produce("provider_image");
    }
    ProviderDashboardComponent.prototype.dayClicked = function (_a) {
        var date = _a.date, events = _a.events;
        if (date_fns_1.isSameMonth(date, this.viewDate)) {
            if ((date_fns_1.isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0) {
                this.activeDayIsOpen = false;
            }
            else {
                this.activeDayIsOpen = true;
                this.viewDate = date;
            }
        }
    };
    ProviderDashboardComponent.prototype.eventTimesChanged = function (_a) {
        var event = _a.event, newStart = _a.newStart, newEnd = _a.newEnd;
        event.start = newStart;
        event.end = newEnd;
        this.handleEvent('Dropped or resized', event);
        this.refresh.next();
    };
    ProviderDashboardComponent.prototype.handleEvent = function (action, event) {
        this.modalData = {
            event: event,
            action: action
        };
        this.modal.open(this.modalContent, {
            size: 'lg'
        });
    };
    ProviderDashboardComponent.prototype.addEvent = function () {
        var _this = this;
        var slot = {
            title: 'New event',
            start: date_fns_1.startOfDay(new Date()),
            end: date_fns_1.endOfDay(new Date()),
            ageFrom: 2,
            ageTo: 6,
            gender: 2,
            otherCondition: '',
            providerId: this.sessionService.account.id,
            id: uuid.v4(),
            price: 50
        };
        var newEvent = {
            title: slot.title,
            start: slot.start,
            end: slot.end,
            color: colors.red,
            draggable: true,
            resizable: {
                beforeStart: true,
                afterEnd: true
            },
            meta: slot
        };
        this.events.push(newEvent);
        this.refresh.next();
        this.slotApi.add(slot)
            .then(function (x) { return _this.notificationService.info("Added a service slot '" + slot.id + "'"); })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
    ProviderDashboardComponent.prototype.delete = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var id, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = event.meta.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.slotApi.delete(id)];
                    case 2:
                        _a.sent();
                        this.notificationService.info("Deleted the service slot '" + id + "'");
                        this.events = this.events.filter(function (x) { return x !== event; });
                        this.refresh.next();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.notificationService.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProviderDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAllSlots();
        this.getUploadedImages()
            .then(function (images) { return _this.images = images; })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
    ProviderDashboardComponent.prototype.addSlot = function () {
        // this.router.navigateByUrl("provider/addslot");
    };
    ProviderDashboardComponent.prototype.loadAllSlots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.slotApi.list({ providerId: this.sessionService.account.id })];
                    case 1:
                        list = _a.sent();
                        list.forEach(function (slot) {
                            _this.events.push({
                                title: slot.title,
                                start: slot.start,
                                end: slot.end,
                                color: colors.red,
                                actions: _this.actions,
                                draggable: true,
                                resizable: {
                                    beforeStart: true,
                                    afterEnd: true
                                },
                                meta: slot
                            });
                        });
                        this.refresh.next();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderDashboardComponent.prototype.convertToDto = function (event) {
        var dto = event.meta;
        dto.start = event.start;
        dto.end = event.end;
        dto.title = event.title;
        return dto;
    };
    ProviderDashboardComponent.prototype.onUploadFinished = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, body, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = event.serverResponse;
                        body = resp.text();
                        if (!(resp.status === 200)) return [3 /*break*/, 2];
                        obj = JSON.parse(body);
                        console.log('Upload response body', obj);
                        return [4 /*yield*/, this.tieImageToProvider(obj.id, obj.fileName)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.notificationService.error(body);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProviderDashboardComponent.prototype.tieImageToProvider = function (imageId, imageName) {
        return __awaiter(this, void 0, void 0, function () {
            var providerId, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerId = this.sessionService.account.id;
                        item = {
                            id: uuid.v4(),
                            providerId: providerId,
                            imageId: imageId,
                            imageName: imageName
                        };
                        return [4 /*yield*/, this.providerImageApi.add(item)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderDashboardComponent.prototype.getUploadedImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var providerId, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerId = this.sessionService.account.id;
                        return [4 /*yield*/, this.providerImageApi.list({ providerId: providerId })];
                    case 1:
                        list = _a.sent();
                        return [2 /*return*/, list.map(function (x) { return _this.uploadApiUrl + x.imageId; })];
                }
            });
        });
    };
    __decorate([
        core_2.ViewChild('modalContent'),
        __metadata("design:type", core_2.TemplateRef)
    ], ProviderDashboardComponent.prototype, "modalContent", void 0);
    ProviderDashboardComponent = __decorate([
        core_1.Component({
            selector: 'amb-provider-dashboard',
            templateUrl: './provider-dashboard.component.html',
            styleUrls: ['./provider-dashboard.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css'],
            changeDetection: core_2.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [api_service_1.ApiServiceFactory,
            ng_bootstrap_1.NgbModal,
            session_service_1.SessionService,
            router_1.Router,
            notification_service_1.NotificationService])
    ], ProviderDashboardComponent);
    return ProviderDashboardComponent;
}());
exports.ProviderDashboardComponent = ProviderDashboardComponent;
//# sourceMappingURL=provider-dashboard.component.js.map