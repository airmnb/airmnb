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
var session_service_1 = require("./session.service");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var layout_1 = require("@angular/cdk/layout");
var AppComponent = /** @class */ (function () {
    function AppComponent(session, router, fb, changeDetectorRef, media) {
        this.session = session;
        this.router = router;
        this.title = 'Air Mom & Baby';
        this.language = 'en';
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = function () { return changeDetectorRef.detectChanges(); };
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.options = fb.group({
            'fixed': false,
            'top': 0,
            'bottom': 0,
        });
        // this.router.events
        // .filter(event => event instanceof NavigationStart)
        // .subscribe(x => {
        //   console.log('Router', x);
        //   console.log('Session', {
        //     account: this.session.account,
        //     role: this.session.role,
        //     profile: this.session.profile
        //   });
        // });
    }
    Object.defineProperty(AppComponent.prototype, "accountName", {
        get: function () {
            return this.session.account ? this.session.account.name : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AppComponent.prototype, "isProvider", {
        get: function () {
            return this.session.isProvider;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.ngOnInit = function () {
        this.session.loadCookie();
    };
    Object.defineProperty(AppComponent.prototype, "hasLoggedIn", {
        get: function () {
            return !!this.session.account;
        },
        enumerable: true,
        configurable: true
    });
    AppComponent.prototype.goTransactions = function () {
        if (!this.hasLoggedIn) {
            return false;
        }
        this.router.navigate(['transactions']);
    };
    AppComponent.prototype.goProfile = function () {
        if (!this.hasLoggedIn) {
            return false;
        }
        this.router.navigateByUrl('profile');
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'amb-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [session_service_1.SessionService,
            router_1.Router,
            forms_1.FormBuilder,
            core_1.ChangeDetectorRef,
            layout_1.MediaMatcher])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map