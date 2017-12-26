"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookingStatus;
(function (BookingStatus) {
    BookingStatus[BookingStatus["Created"] = 0] = "Created";
    BookingStatus[BookingStatus["Cancelled"] = 1] = "Cancelled";
    BookingStatus[BookingStatus["Ongoing"] = 2] = "Ongoing";
    BookingStatus[BookingStatus["Finished"] = 3] = "Finished";
    BookingStatus[BookingStatus["Terminated"] = 4] = "Terminated";
})(BookingStatus = exports.BookingStatus || (exports.BookingStatus = {}));
var Gender;
(function (Gender) {
    Gender[Gender["Girl"] = 0] = "Girl";
    Gender[Gender["Boy"] = 1] = "Boy";
    Gender[Gender["Either"] = 2] = "Either";
})(Gender = exports.Gender || (exports.Gender = {}));
var Role;
(function (Role) {
    Role[Role["Consumer"] = 0] = "Consumer";
    Role[Role["Provider"] = 1] = "Provider";
})(Role = exports.Role || (exports.Role = {}));
//# sourceMappingURL=types.js.map