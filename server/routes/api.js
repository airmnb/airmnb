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
/**
 * Generic creating data
 */
exports.router.post('/data/:typeName', function (req, res) {
    var typeName = req.params.typeName;
    var item = req.body;
    if (!typeName) {
        res.status(400).end('No typeName detected from routing URL.');
    }
    if (!item) {
        res.status(400).end('No body detected from the request.');
    }
    var gateway = gateway_1.dataGatewayFactory.produce(typeName);
    gateway.create(item)
        .then(function (id) {
        res.status(201).json(id);
    })
        .catch(function (e) {
        res.status(500).json(e);
    });
});
/**
 * Generic get one object
 */
exports.router.get('/data/:typeName', function (req, res) {
    var typeName = req.params.typeName;
    var query = req.query || {};
    var gateway = gateway_1.dataGatewayFactory.produce(typeName);
    gateway.queryOne(query)
        .then(function (x) {
        res.json(x);
    })
        .catch(function (e) {
        res.status(500).json(e);
    });
});
/**
 * Generic list objects by query
 */
exports.router.get('/data/:typeName/list', function (req, res) {
    var typeName = req.params.typeName;
    var query = req.query || {};
    var gateway = gateway_1.dataGatewayFactory.produce(typeName);
    gateway.query(query)
        .then(function (list) {
        res.json(list);
    })
        .catch(function (e) {
        res.status(500).json(e);
    });
});
/**
 * Generic get one object by id
 */
exports.router.get('/data/:typeName/:id', function (req, res) {
    var typeName = req.params.typeName;
    var query = { id: req.params.id };
    var gateway = gateway_1.dataGatewayFactory.produce(typeName);
    gateway.queryOne(query)
        .then(function (x) {
        res.json(x);
    })
        .catch(function (e) {
        res.status(500).json(e);
    });
});
/**
 * Login
 */
exports.router.post('/login', function (req, res) {
    var info = req.body;
    if (!info || !info.name || !info.password) {
        res.sendStatus(400);
    }
    var accountGateway = gateway_1.dataGatewayFactory.produce('account');
    var query = {
        name: info.name,
        secret: info.password
    };
    accountGateway.queryOne(query)
        .then(function (x) {
        delete x.secret;
        if (x.enabled) {
            res.json(x);
        }
        else {
            res.sendStatus(404);
        }
    })
        .catch(function (e) {
        res.status(500).json(e);
    });
});
//# sourceMappingURL=api.js.map