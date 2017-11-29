"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var map_service_service_1 = require("./map-service.service");
describe('MapServiceService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [map_service_service_1.MapServiceService]
        });
    });
    it('should be created', testing_1.inject([map_service_service_1.MapServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=map-service.service.spec.js.map