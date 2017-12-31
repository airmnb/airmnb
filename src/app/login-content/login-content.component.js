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
var api_service_1 = require("../api.service");
var session_service_1 = require("../session.service");
var router_1 = require("@angular/router");
var types_1 = require("../../../types");
var notification_service_1 = require("../notification.service");
var angular4_social_login_1 = require("angular4-social-login");
var apiFacade_1 = require("../apiFacade");
var util_service_1 = require("../util.service");
var LoginContentComponent = /** @class */ (function () {
    function LoginContentComponent(loginService, sessionService, notificationService, router, api, util, authService) {
        this.loginService = loginService;
        this.sessionService = sessionService;
        this.notificationService = notificationService;
        this.router = router;
        this.api = api;
        this.util = util;
        this.authService = authService;
    }
    LoginContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.authState.subscribe(function (user) { return __awaiter(_this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Google SSO user', user);
                        if (!user)
                            return [2 /*return*/];
                        console.log("Google SSO user isn't null", user);
                        return [4 /*yield*/, this.getOrCreateAccountForSso(user)];
                    case 1:
                        account = _a.sent();
                        console.log('SSO account', account);
                        return [4 /*yield*/, this.login(account.name, account.secret, types_1.Role.Consumer)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    LoginContentComponent.prototype.getOrCreateAccountForSso = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var account, accountId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.accountApi.get({ name: user.name })];
                    case 1:
                        account = _a.sent();
                        if (!!account) return [3 /*break*/, 3];
                        // Not existing account
                        account = {
                            id: this.util.newGuid(),
                            name: user.name,
                            secret: this.util.newGuid() + "@google",
                            enabled: true,
                            email: user.email
                        };
                        return [4 /*yield*/, this.api.accountApi.add(account)];
                    case 2:
                        accountId = _a.sent();
                        account.id = accountId;
                        _a.label = 3;
                    case 3: return [2 /*return*/, account];
                }
            });
        });
    };
    LoginContentComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.submitted = true;
                        return [4 /*yield*/, this.login(this.accountName, this.password, this.role)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginContentComponent.prototype.login = function (name, password, role) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var account, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.loginService.login({
                                name: name,
                                password: password,
                                role: role
                            })];
                    case 1:
                        account = _a.sent();
                        return [4 /*yield*/, this.sessionService.login(account, role)];
                    case 2:
                        _a.sent();
                        this.sessionService.getProfile().subscribe(function (p) { return _this.routeByProfile(p); });
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.notificationService.error(e_1);
                        this.submitted = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginContentComponent.prototype.routeByProfile = function (p) {
        if (p) {
            this.router.navigateByUrl("/");
        }
        else {
            this.notificationService.info("Please input your profile to continue the journey.");
            this.router.navigate(['/profile']);
        }
    };
    LoginContentComponent.prototype.loginWithGoogle = function () {
        try {
            this.authService.signIn(angular4_social_login_1.GoogleLoginProvider.PROVIDER_ID);
        }
        catch (e) {
            console.log('loginWithGoogle', e);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], LoginContentComponent.prototype, "accountName", void 0);
    LoginContentComponent = __decorate([
        core_1.Component({
            selector: 'amb-login-content',
            templateUrl: './login-content.component.html',
            styleUrls: ['./login-content.component.css']
        }),
        __metadata("design:paramtypes", [api_service_1.LoginService,
            session_service_1.SessionService,
            notification_service_1.NotificationService,
            router_1.Router,
            apiFacade_1.ApiFacade,
            util_service_1.UtilService,
            angular4_social_login_1.AuthService])
    ], LoginContentComponent);
    return LoginContentComponent;
}());
exports.LoginContentComponent = LoginContentComponent;
//# sourceMappingURL=login-content.component.js.map