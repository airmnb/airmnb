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
var slot_image_service_1 = require("../slot-image.service");
var apiFacade_1 = require("../apiFacade");
var util_service_1 = require("../util.service");
var router_1 = require("@angular/router");
var ProfileContentComponent = /** @class */ (function () {
    function ProfileContentComponent(api, sessionService, notificationService, slotImageService, util, router) {
        this.api = api;
        this.sessionService = sessionService;
        this.notificationService = notificationService;
        this.slotImageService = slotImageService;
        this.util = util;
        this.router = router;
        this.uploadApiUrl = "/api/image/";
        this.model = {
            id: null,
            firstName: null,
            lastName: null,
            dob: null,
            gender: null,
            location: {
                address: null,
                location: {
                    type: "Point",
                    coordinates: [0, 0]
                }
            },
            imageNames: [],
            imageUrls: [],
            description: null,
            language: {
                english: null,
                chinese: null,
                japanese: null
            }
        };
    }
    ProfileContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.getUploadedImages()
        // .then(images => this.images = images)
        // .catch(e => this.notificationService.error(e));
        var accountId = this.sessionService.account.id;
        console.log('accountId', accountId);
        this.api.accountProfileApi.get({ accountId: accountId })
            .then(function (p) { return _this.setModel(p); })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
    ProfileContentComponent.prototype.setModel = function (p) {
        if (!p) {
            return;
        }
        this.model.id = p.id,
            this.model.firstName = p.firstName;
        this.model.lastName = p.lastName;
        this.model.location = Object.assign(this.model.location, p.location);
        this.model.dob = p.dob;
        this.model.gender = p.gender;
        this.model.imageNames = p.imageNames;
        // this.model.age.a23 = p.ageFrom <= 2 && 3 < p.ageTo;
        // this.model.age.a34 = p.ageFrom <= 3 && 4 < p.ageTo;
        // this.model.age.a45 = p.ageFrom <= 4 && 5 < p.ageTo;
        // this.model.age.a56 = p.ageFrom <= 5 && 6 <= p.ageTo;
        // this.model.language.english = p.languages.includes('en');
        // this.model.language.chinese = p.languages.includes('ch');
        // this.model.language.japanese = p.languages.includes('jp');
    };
    ProfileContentComponent.prototype.onSubmit = function () {
        var _this = this;
        // const profile: Profile = {
        //   id: uuid.v4(),
        //   accountId: this.sessionService.account.id,
        //   firstName: this.model.firstName,
        //   lastName: this.model.lastName,
        //   dob: this.model.dob,
        //   gender: this.model.gender
        // };
        // this.api.providerProfileApi.add(profile);
        var p = {
            id: this.model.id || this.util.newGuid(),
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            dob: this.model.dob,
            location: this.model.location,
            accountId: this.sessionService.account.id,
            gender: this.model.gender,
            imageNames: this.model.imageNames,
        };
        this.api.accountProfileApi.add(p)
            .then(function (x) {
            _this.router.navigate(['']);
        })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
    ProfileContentComponent.prototype.onUploadFinished = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var resp, filename;
            return __generator(this, function (_a) {
                resp = event.serverResponse;
                filename = resp.text();
                if (resp.status === 200) {
                    this.model.imageNames.push(filename);
                }
                else {
                    this.notificationService.error(resp);
                }
                return [2 /*return*/];
            });
        });
    };
    ProfileContentComponent.prototype.tieImageToAccount = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            var providerId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerId = this.sessionService.account.id;
                        return [4 /*yield*/, this.slotImageService.saveImageNameForProvider(imageName, providerId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileContentComponent.prototype.getUploadedImages = function () {
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
    ProfileContentComponent.prototype.onUploadFinishedForLoader = function (err) {
        console.log('image loader', err);
        console.log('image names', this.model.imageNames);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ProfileContentComponent.prototype, "profileRole", void 0);
    ProfileContentComponent = __decorate([
        core_1.Component({
            selector: 'amb-profile-content',
            templateUrl: './profile-content.component.html',
            styleUrls: ['./profile-content.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            session_service_1.SessionService,
            notification_service_1.NotificationService,
            slot_image_service_1.ImageService,
            util_service_1.UtilService,
            router_1.Router])
    ], ProfileContentComponent);
    return ProfileContentComponent;
}());
exports.ProfileContentComponent = ProfileContentComponent;
//# sourceMappingURL=profile-content.component.js.map