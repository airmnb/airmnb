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
var uuid = require("uuid");
var session_service_1 = require("../session.service");
var notification_service_1 = require("../notification.service");
var modal_service_1 = require("../modal.service");
var moment = require("moment");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var apiFacade_1 = require("../apiFacade");
var SlotComponent = (function () {
    function SlotComponent(api, sessionService, notificationService, modalService, activeModal) {
        this.api = api;
        this.sessionService = sessionService;
        this.notificationService = notificationService;
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.model = {
            capping: 5,
            date: null,
            timeFrom: null,
            timeTo: null,
            ageFrom: null,
            ageTo: null,
            description: null,
            price: 50,
            title: "Fun party time"
        };
    }
    SlotComponent.prototype.ConvertToSlot = function () {
        var producerId = this.sessionService.account.id;
        var slot = {
            id: uuid.v4(),
            providerId: producerId,
            ageFrom: this.model.ageFrom || 3,
            ageTo: this.model.ageTo || 6,
            start: this.getStartTime(),
            end: this.getEndTime(),
            gender: 2,
            otherCondition: this.model.description,
            price: this.model.price,
            title: this.model.title,
            text: this.model.description,
            capping: this.model.capping
        };
        return slot;
    };
    SlotComponent.prototype.getStartTime = function () {
        try {
            return moment().year(this.model.date.year)
                .month(this.model.date.month)
                .day(this.model.date.day)
                .hour(this.model.timeFrom.hour)
                .minute(this.model.timeFrom.minute)
                .toDate();
        }
        catch (e) {
            return new Date();
        }
    };
    SlotComponent.prototype.getEndTime = function () {
        try {
            return moment().year(this.model.date.year)
                .month(this.model.date.month)
                .day(this.model.date.day)
                .hour(this.model.timeTo.hour)
                .minute(this.model.timeTo.minute)
                .toDate();
        }
        catch (e) {
            return new Date();
        }
    };
    SlotComponent.prototype.ngOnInit = function () {
    };
    SlotComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.sessionService.hasLoggedIn) {
            // this.notificationService.error('Please log in first');
            this.modalService.openLoginModal();
            return false;
        }
        var producerId = this.sessionService.account.id;
        var slot = this.ConvertToSlot();
        this.api.slotApi.add(slot)
            .then(function (x) {
            _this.notificationService.info("Added slot " + x);
            _this.activeModal.dismiss();
            window.location.reload();
        })
            .catch(function (e) { return _this.notificationService.error(e); });
    };
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
            ng_bootstrap_1.NgbActiveModal])
    ], SlotComponent);
    return SlotComponent;
}());
exports.SlotComponent = SlotComponent;
//# sourceMappingURL=slot.component.js.map