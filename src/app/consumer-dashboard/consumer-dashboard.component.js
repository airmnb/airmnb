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
var slot_service_1 = require("../slot.service");
var modal_service_1 = require("../modal.service");
var session_service_1 = require("../session.service");
var uuid = require("uuid");
var apiFacade_1 = require("../apiFacade");
var ConsumerDashboardComponent = (function () {
    function ConsumerDashboardComponent(route, router, sessionService, searchService, modalService, api) {
        this.route = route;
        this.router = router;
        this.sessionService = sessionService;
        this.searchService = searchService;
        this.modalService = modalService;
        this.api = api;
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
                    valuePrepareFunction: this.displayGender
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
    Object.defineProperty(ConsumerDashboardComponent.prototype, "hasLoggedIn", {
        get: function () {
            return this.sessionService.hasLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    ConsumerDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            var q = {};
            Object.keys(params).forEach(function (k) { return q[k] = +params[k]; });
            _this.searchService.search(q)
                .subscribe(function (slots) { return _this.slots = slots; });
        });
        this.loadBabyProfiles();
    };
    ConsumerDashboardComponent.prototype.addBaby = function () {
        this.modalService.openAddBabyModal();
    };
    ConsumerDashboardComponent.prototype.displayGender = function (cell, row) {
        var gender = cell === '1' ? 'Boy' :
            cell === '0' ? 'Girl' : '';
        return gender;
    };
    ConsumerDashboardComponent.prototype.loadBabyProfiles = function () {
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
    ConsumerDashboardComponent.prototype.onCreate = function (event) {
        var data = event.newData;
        var babyProfile = {
            nickName: data.nickName,
            age: data.age,
            consumerId: this.sessionService.account.id,
            gender: data.gender,
            id: uuid.v4(),
            hobby: data.hobby,
            info: data.info
        };
        this.api.babyProfileApi.add(babyProfile)
            .then(function (x) { return event.confirm.resolve(data); })
            .catch(function (e) { return event.confirm.reject(e); });
    };
    ConsumerDashboardComponent.prototype.onEdit = function (event) {
        var data = event.newData;
        var babyProfile = {
            nickName: data.nickName,
            age: data.age,
            id: data.id,
            consumerId: this.sessionService.account.id,
            gender: data.gender,
            hobby: data.hobby,
            info: data.info
        };
        this.api.babyProfileApi.update(babyProfile, data.id)
            .then(function (x) { return event.confirm.resolve(data); })
            .catch(function (e) { return event.confirm.reject(e); });
    };
    ConsumerDashboardComponent.prototype.onDelete = function (event) {
        var id = event.data.id;
        if (id) {
            this.api.babyProfileApi.delete(id)
                .then(function (x) { return event.confirm.resolve(null); })
                .catch(function (e) { return event.confirm.reject(e); });
        }
    };
    ConsumerDashboardComponent = __decorate([
        core_1.Component({
            selector: 'amb-consumer-dashboard',
            templateUrl: './consumer-dashboard.component.html',
            styleUrls: ['./consumer-dashboard.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            session_service_1.SessionService,
            slot_service_1.SlotService,
            modal_service_1.ModalService,
            apiFacade_1.ApiFacade])
    ], ConsumerDashboardComponent);
    return ConsumerDashboardComponent;
}());
exports.ConsumerDashboardComponent = ConsumerDashboardComponent;
//# sourceMappingURL=consumer-dashboard.component.js.map