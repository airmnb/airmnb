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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var api_service_1 = require("../api.service");
var session_service_1 = require("../session.service");
var router_1 = require("@angular/router");
var modal_service_1 = require("../modal.service");
var LoginContentComponent = (function () {
    function LoginContentComponent(modalService, activeModal, loginService, sessionService, router) {
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.loginService = loginService;
        this.sessionService = sessionService;
        this.router = router;
    }
    LoginContentComponent.prototype.ngOnInit = function () {
    };
    LoginContentComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var account, routeUrl, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.submitted = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.loginService.login({
                                name: this.accountName,
                                password: this.password,
                                role: this.role
                            })];
                    case 2:
                        account = _a.sent();
                        this.sessionService.login(account);
                        this.modalService.dismissModal();
                        routeUrl = this.role === 'provider' ? 'provider' :
                            this.role === 'consumer' ? 'consumer' :
                                '';
                        this.router.navigateByUrl(routeUrl);
                        this.errorMessage = null;
                        this.activeModal.dismiss();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.errorMessage = e_1.message;
                        this.submitted = false;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginContentComponent.prototype.signup = function () {
        this.activeModal.dismiss();
        this.modalService.openSignupModal();
        return false;
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
        __metadata("design:paramtypes", [modal_service_1.ModalService,
            ng_bootstrap_1.NgbActiveModal,
            api_service_1.LoginService,
            session_service_1.SessionService,
            router_1.Router])
    ], LoginContentComponent);
    return LoginContentComponent;
}());
exports.LoginContentComponent = LoginContentComponent;
//# sourceMappingURL=login-content.component.js.map