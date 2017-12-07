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
var router_1 = require("@angular/router");
var slot_search_service_service_1 = require("../slot-search-service.service");
var ConsumerDashboardComponent = (function () {
    function ConsumerDashboardComponent(route, router, searchService) {
        this.route = route;
        this.router = router;
        this.searchService = searchService;
    }
    ConsumerDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            console.log('query string obj', params);
            _this.searchService.search(params).subscribe(function (slots) { return _this.slots = slots; });
        });
    };
    ConsumerDashboardComponent = __decorate([
        core_1.Component({
            selector: 'amb-consumer-dashboard',
            templateUrl: './consumer-dashboard.component.html',
            styleUrls: ['./consumer-dashboard.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            slot_search_service_service_1.SlotSearchServiceService])
    ], ConsumerDashboardComponent);
    return ConsumerDashboardComponent;
}());
exports.ConsumerDashboardComponent = ConsumerDashboardComponent;
//# sourceMappingURL=consumer-dashboard.component.js.map