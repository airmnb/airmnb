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
var session_service_1 = require("../session.service");
var slot_service_1 = require("../slot.service");
var apiFacade_1 = require("../apiFacade");
var slot_image_service_1 = require("../slot-image.service");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(route, router, sessionService, searchService, api, imageService) {
        this.route = route;
        this.router = router;
        this.sessionService = sessionService;
        this.searchService = searchService;
        this.api = api;
        this.imageService = imageService;
        this.babyProfileSettings = {
            edit: {
                confirmSave: true,
            },
            add: {
                confirmCreate: true,
                addButtonContent: 'Add new baby'
            },
            delete: {
                confirmDelete: true
            },
            columns: {
                nickName: {
                    title: 'Nick Name',
                    filter: false
                },
                age: {
                    title: 'Age',
                    filter: false,
                    editor: {
                        type: 'list',
                        config: {
                            list: [
                                { value: 0, title: '< 2' },
                                { value: 2, title: '2-3' },
                                { value: 3, title: '3-4' },
                                { value: 4, title: '4-5' },
                                { value: 5, title: '5-6' },
                                { value: 6, title: '> 6' }
                            ]
                        }
                    }
                },
                gender: {
                    title: 'Gender',
                    filter: false,
                    editor: {
                        type: 'list',
                        config: {
                            list: [{ value: 0, title: 'Girl' }, { value: 1, title: 'Boy' }]
                        }
                    },
                },
                hobby: {
                    title: 'Hobby',
                    filter: false,
                    editor: {
                        type: 'textarea'
                    }
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
    Object.defineProperty(SearchResultComponent.prototype, "hasLoggedIn", {
        get: function () {
            return this.sessionService.hasLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    SearchResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            var queryJson = params['q'];
            var query = JSON.parse(queryJson);
            console.log('Search query', query);
            _this.searchService.search(query)
                .subscribe(function (slots) { return _this.slots = slots; });
        });
        this.loadBabyProfiles();
    };
    SearchResultComponent.prototype.getImageUrl = function (slot) {
        if (slot.imageNames && slot.imageNames.length) {
            return this.imageService.getImageUrl(slot.imageNames[0]);
        }
        else {
            return "";
        }
    };
    SearchResultComponent.prototype.loadBabyProfiles = function () {
        var _this = this;
        if (!this.hasLoggedIn) {
            return;
        }
        this.api.babyProfileApi.list({ consumerId: this.sessionService.account.id })
            .then(function (x) {
            _this.babyProfiles = x;
        })
            .catch(console.log);
    };
    SearchResultComponent.prototype.book = function (slot) {
        if (!slot) {
            return;
        }
        this.router.navigate(['/bookings/add/', slot.id]);
    };
    SearchResultComponent = __decorate([
        core_1.Component({
            selector: 'amb-search-result',
            templateUrl: './search-result.component.html',
            styleUrls: ['./search-result.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            session_service_1.SessionService,
            slot_service_1.SlotService,
            apiFacade_1.ApiFacade,
            slot_image_service_1.ImageService])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
//# sourceMappingURL=search-result.component.js.map