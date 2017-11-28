"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var session_service_1 = require("./session.service");
describe('SessionService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [session_service_1.SessionService]
        });
    });
    it('should be created', testing_1.inject([session_service_1.SessionService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=session.service.spec.js.map