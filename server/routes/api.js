'user strict';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var gateway_1 = require("../data/gateway");
exports.router = express.Router();
/* GET api listing. */
exports.router.get('/', function (req, res) {
    res.send('OK');
});
exports.router.post('/account', function (req, res) {
    var item = req.body;
    console.log(item);
    var gateway = gateway_1.dataGatewayFactory.produce('account');
    gateway.create(item)
        .then(function (x) {
        res.status(201);
    })
        .catch(function (e) {
        console.log(e);
        res.status(500);
        res.end(e);
    });
});
//# sourceMappingURL=api.js.map