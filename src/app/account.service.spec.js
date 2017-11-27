"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var account_service_1 = require("./account.service");
describe('AccountService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [account_service_1.AccountService]
        });
    });
    it('should be created', testing_1.inject([account_service_1.AccountService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=account.service.spec.js.map