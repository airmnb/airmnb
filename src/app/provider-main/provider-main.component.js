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
var session_service_1 = require("../session.service");
var slot_image_service_1 = require("../slot-image.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var router_1 = require("@angular/router");
var modal_service_1 = require("../modal.service");
var notification_service_1 = require("../notification.service");
var apiFacade_1 = require("../apiFacade");
var ProviderMainComponent = (function () {
    function ProviderMainComponent(api, slotImageService, modal, sessionService, router, modalservice, notificationService) {
        this.api = api;
        this.slotImageService = slotImageService;
        this.modal = modal;
        this.sessionService = sessionService;
        this.router = router;
        this.modalservice = modalservice;
        this.notificationService = notificationService;
        this.uploadApiUrl = "/api/image/";
        this.images = [];
        this.slotsSettings = {
            edit: {
                confirmSave: true,
            },
            add: {
                confirmCreate: true,
                addButtonContent: 'Add service slot'
            },
            delete: {
                confirmDelete: true
            },
            columns: {
                date: {
                    title: 'Date',
                    filter: false,
                },
                timeStart: {
                    title: 'Start',
                    filter: false
                },
                timeEnd: {
                    title: 'End',
                    filter: false
                },
                hours: {
                    title: 'Hours',
                    filter: false
                },
                capping: {
                    title: 'Capping',
                    filter: false,
                    editor: {
                        type: 'list',
                        config: {
                            list: [
                                { value: 2, title: '2' },
                                { value: 3, title: '3' },
                                { value: 4, title: '4' },
                                { value: 5, title: '5' }
                            ]
                        }
                    }
                },
                price: {
                    title: 'Price',
                    filter: false
                },
                info: {
                    title: 'Additional information',
                    filter: false,
                    editor: {
                        type: 'textarea'
                    }
                }
            }
        };
    }
    ProviderMainComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAllSlots();
        this.getUploadedImages()
            .then(function (images) { return _this.images = images; })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
    ProviderMainComponent.prototype.loadAllSlots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.slotApi.list({ providerId: this.sessionService.account.id })];
                    case 1:
                        list = _a.sent();
                        this.slots = list;
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderMainComponent.prototype.delete = function (slot) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.api.slotApi.delete(slot.id)];
                    case 1:
                        _a.sent();
                        this.slots = this.slots.filter(function (x) { return x !== slot; });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.notificationService.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProviderMainComponent.prototype.edit = function (slot) {
    };
    ProviderMainComponent.prototype.addSlot = function () {
        // this.router.navigateByUrl("provider/addslot");
        this.modalservice.openAddSlotModal();
    };
    ProviderMainComponent.prototype.onUploadFinished = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, filename;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resp = event.serverResponse;
                        filename = resp.text();
                        if (!(resp.status === 200)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.tieImageToProvider(filename)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.notificationService.error(resp);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProviderMainComponent.prototype.tieImageToProvider = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            var accountId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountId = this.sessionService.account.id;
                        return [4 /*yield*/, this.slotImageService.saveImageNameForProvider(imageName, accountId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProviderMainComponent.prototype.getUploadedImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var providerId, names;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerId = this.sessionService.account.id;
                        return [4 /*yield*/, this.slotImageService.getImageNamesForProvider(providerId)];
                    case 1:
                        names = _a.sent();
                        return [2 /*return*/, names.map(function (x) { return "/image/" + x; })];
                }
            });
        });
    };
    /** For slots */
    ProviderMainComponent.prototype.onCreate = function (event) {
        var data = event.newData;
        // const babyProfile: ServiceSlot = {
        //   nickName: data.nickName,
        //   age: data.age,
        //   consumerId: this.sessionService.account.id,
        //   gender: data.gender,
        //   id: uuid.v4(),
        //   hobby: data.hobby,
        //   info: data.info
        // };
        // this.slotApi.add(babyProfile)
        //   .then(x => event.confirm.resolve(data))
        //   .catch(e => event.confirm.reject(e));
    };
    ProviderMainComponent.prototype.onEdit = function (event) {
        var data = event.newData;
        // const babyProfile: ServiceSlot = {
        //   nickName: data.nickName,
        //   age: data.age,
        //   id: data.id,
        //   consumerId: this.sessionService.account.id,
        //   gender: data.gender,
        //   hobby: data.hobby,
        //   info: data.info
        // };
        // this.slotApi.update(babyProfile, data.id)
        //   .then(x => event.confirm.resolve(data))
        //   .catch(e => event.confirm.reject(e));
    };
    ProviderMainComponent.prototype.onDelete = function (event) {
        var id = event.data.id;
        if (id) {
            this.api.slotApi.delete(id)
                .then(function (x) { return event.confirm.resolve(null); })
                .catch(function (e) { return event.confirm.reject(e); });
        }
    };
    ProviderMainComponent = __decorate([
        core_1.Component({
            selector: 'amb-provider-main',
            templateUrl: './provider-main.component.html',
            styleUrls: ['./provider-main.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            slot_image_service_1.ImageService,
            ng_bootstrap_1.NgbModal,
            session_service_1.SessionService,
            router_1.Router,
            modal_service_1.ModalService,
            notification_service_1.NotificationService])
    ], ProviderMainComponent);
    return ProviderMainComponent;
}());
exports.ProviderMainComponent = ProviderMainComponent;
//# sourceMappingURL=provider-main.component.js.map