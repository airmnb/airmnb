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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var login_content_component_1 = require("./login-content/login-content.component");
var signup_content_component_1 = require("./signup-content/signup-content.component");
var ModalService = (function () {
    function ModalService(modalService, activeModal, sessionService) {
        this.modalService = modalService;
        this.activeModal = activeModal;
        this.sessionService = sessionService;
    }
    // private openGenericRegisterModal(mode: string, tit) {
    //   const modalRef = this.modalService.open(RegisterModalComponent);
    //   modalRef.componentInstance.mode = mode;
    //   modalRef.componentInstance.title = mode;
    // }
    ModalService.prototype.openLoginModal = function () {
        this.activeModal.dismiss();
        var modalRef = this.modalService.open(login_content_component_1.LoginContentComponent);
    };
    ModalService.prototype.openSignupModal = function () {
        this.activeModal.dismiss();
        var modalRef = this.modalService.open(signup_content_component_1.SignupContentComponent);
    };
    ModalService.prototype.openProviderProfileModal = function () {
        //this.openGenericRegisterModal('providerProfile');
    };
    ModalService.prototype.dismissModal = function () {
        this.activeModal.dismiss();
    };
    ModalService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
            ng_bootstrap_1.NgbActiveModal,
            session_service_1.SessionService])
    ], ModalService);
    return ModalService;
}());
exports.ModalService = ModalService;
//# sourceMappingURL=modal.service.js.map