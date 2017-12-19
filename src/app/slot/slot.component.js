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
var types_1 = require("../../../types");
var session_service_1 = require("../session.service");
var notification_service_1 = require("../notification.service");
var modal_service_1 = require("../modal.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var apiFacade_1 = require("../apiFacade");
var util_service_1 = require("../util.service");
var router_1 = require("@angular/router");
var slot_image_service_1 = require("../slot-image.service");
var SlotComponent = (function () {
    function SlotComponent(api, sessionService, notificationService, modalService, activeModal, util, router, activatedRoute, imageServcie) {
        this.api = api;
        this.sessionService = sessionService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.util = util;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.imageServcie = imageServcie;
        this.uploadApiUrl = "/api/image/";
        this.model = {
            title: null,
            date: null,
            timeFrom: null,
            timeTo: null,
            ageFrom: null,
            ageTo: null,
            description: null,
            capping: null,
            vacancy: null,
            price: null,
            imageNames: []
        };
        this.theSlot = {
            id: this.util.newGuid(),
            capping: 5,
            bookingCount: 0,
            gender: types_1.Gender.Either,
            otherCondition: null,
            price: 8,
            providerId: this.sessionService.account.id,
            text: null,
            title: null,
            ageFrom: 2,
            ageTo: 6,
            start: new Date(),
            end: null,
            imageNames: null,
            location: this.sessionService.profile.location
        };
    }
    Object.defineProperty(SlotComponent.prototype, "slot", {
        set: function (value) {
            if (value) {
                this.theSlot = value;
                this.isNew = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    SlotComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.params.subscribe(function (p) {
            var slotId = p.id;
            _this.isNew = !slotId;
            if (!_this.isNew) {
                // Edit mode
                _this.api.slotApi.getOne(slotId)
                    .then(function (s) {
                    _this.theSlot = s;
                    _this.model = _this.slotToModel(_this.theSlot);
                }).catch(function (e) { return _this.notificationService.error(e); });
            }
        });
    };
    SlotComponent.prototype.slotToModel = function (slot) {
        var m = {
            title: slot.title,
            date: this.util.getYearMonthDate(slot.start),
            timeFrom: this.util.getHourAndMinute(slot.start),
            timeTo: this.util.getHourAndMinute(slot.end),
            ageFrom: slot.ageFrom,
            ageTo: slot.ageTo,
            description: slot.otherCondition,
            capping: slot.capping,
            vacancy: slot.capping - slot.bookingCount,
            price: slot.price,
            imageNames: slot.imageNames
        };
        return m;
    };
    SlotComponent.prototype.modelToSlot = function () {
        this.theSlot = Object.assign(this.theSlot, {
            title: this.model.title,
            start: this.util.getDate(this.model.date, this.model.timeFrom),
            end: this.util.getDate(this.model.date, this.model.timeTo),
            capping: this.model.capping,
            ageFrom: this.model.ageFrom,
            ageTo: this.model.ageTo,
            price: this.model.price,
            otherCondition: this.model.description,
            imageNames: this.model.imageNames
        });
        return this.theSlot;
    };
    SlotComponent.prototype.onSubmit = function () {
        var _this = this;
        var slot = this.modelToSlot();
        var p = this.isNew ? this.add(slot) : this.update(slot);
        p
            .then(function () {
            _this.router.navigate(['/slots']);
        })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
    SlotComponent.prototype.add = function (slot) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.slotApi.add(slot)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SlotComponent.prototype.update = function (slot) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.slotApi.update(slot)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SlotComponent.prototype.getUploadedImages = function () {
        return this.imageServcie.getImageUrls(this.model.imageNames);
    };
    SlotComponent.prototype.onUploadFinished = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, filename;
            return __generator(this, function (_a) {
                resp = event.serverResponse;
                filename = resp.text();
                if (resp.status === 200) {
                    // await this.tieImageToAccount(filename);
                    this.model.imageNames = this.model.imageNames || [];
                    this.model.imageNames.push(filename);
                }
                else {
                    this.notificationService.error(resp);
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], SlotComponent.prototype, "slot", null);
    SlotComponent = __decorate([
        core_1.Component({
            selector: 'amb-slot',
            templateUrl: './slot.component.html',
            styleUrls: ['./slot.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            session_service_1.SessionService,
            notification_service_1.NotificationService,
            modal_service_1.ModalService,
            ng_bootstrap_1.NgbActiveModal,
            util_service_1.UtilService,
            router_1.Router,
            router_1.ActivatedRoute,
            slot_image_service_1.ImageService])
    ], SlotComponent);
    return SlotComponent;
}());
exports.SlotComponent = SlotComponent;
//# sourceMappingURL=slot.component.js.map