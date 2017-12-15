"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var home_component_1 = require("../home/home.component");
var consumer_dashboard_component_1 = require("../consumer-dashboard/consumer-dashboard.component");
var aboutus_component_1 = require("../aboutus/aboutus.component");
var add_slot_component_1 = require("../add-slot/add-slot.component");
var provider_main_component_1 = require("../provider-main/provider-main.component");
var login_component_1 = require("../login/login.component");
var signup_component_1 = require("../signup/signup.component");
var account_profile_component_1 = require("../account-profile/account-profile.component");
var slot_list_component_1 = require("../slot-list/slot-list.component");
var slot_edit_component_1 = require("../slot-edit/slot-edit.component");
var slot_component_1 = require("../slot/slot.component");
var booking_component_1 = require("../booking/booking.component");
var booking_view_component_1 = require("../booking-view/booking-view.component");
var booking_list_component_1 = require("../booking-list/booking-list.component");
var transactions_component_1 = require("../transactions/transactions.component");
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'signup',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'profile',
        component: account_profile_component_1.AccountProfileComponent
    },
    {
        path: 'slotlist',
        component: slot_list_component_1.SlotListComponent
    },
    {
        path: 'slots',
        component: slot_edit_component_1.SlotEditComponent,
    },
    {
        path: 'slots/bookings',
        component: booking_list_component_1.BookingListComponent,
    },
    {
        path: 'slots/bookings/:slotId',
        component: booking_list_component_1.BookingListComponent,
    },
    {
        path: 'slots/add',
        component: slot_component_1.SlotComponent
    },
    {
        path: 'slots/edit/:id',
        component: slot_component_1.SlotComponent
    },
    {
        path: 'bookings/add/:slotId',
        component: booking_component_1.BookingComponent
    },
    {
        path: 'bookings',
        component: booking_list_component_1.BookingListComponent
    },
    {
        path: 'bookings/:id',
        component: booking_view_component_1.BookingViewComponent
    },
    {
        path: 'provider',
        component: provider_main_component_1.ProviderMainComponent
    },
    {
        path: 'provider/addslot',
        component: add_slot_component_1.AddSlotComponent
    },
    {
        path: 'consumer',
        component: consumer_dashboard_component_1.ConsumerDashboardComponent
    },
    {
        path: 'aboutus',
        component: aboutus_component_1.AboutusComponent
    },
    {
        path: 'transactions',
        component: transactions_component_1.TransactionsComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map