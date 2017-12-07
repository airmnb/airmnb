'user strict';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var gateway_1 = require("../data/gateway");
var utils_1 = require("./utils");
var fs = require("fs");
var multer = require("multer");
var path = require("path");
var Loki = require("lokijs");
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
 * Generic update one object by id
 */
exports.router.put('/data/:typeName/:id', function (req, res) {
    var typeName = req.params.typeName;
    var id = req.params.id;
    var item = req.body;
    item.id = id;
    var gateway = gateway_1.dataGatewayFactory.produce(typeName);
    gateway.update(item)
        .then(function (x) {
        res.json(x);
    })
        .catch(function (e) {
        res.status(500).json(e);
    });
});
/**
 * Generic update one object by id
 */
exports.router.delete('/data/:typeName/:id', function (req, res) {
    var typeName = req.params.typeName;
    var id = req.params.id;
    var gateway = gateway_1.dataGatewayFactory.produce(typeName);
    gateway.delete(id)
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
/**
 * Upload image
 */
var DB_NAME = 'db.json';
var COLLECTION_NAME = 'images';
var UPLOAD_PATH = 'uploads';
var upload = multer({ dest: UPLOAD_PATH + "/", fileFilter: utils_1.imageFilter });
var db = new Loki(UPLOAD_PATH + "/" + DB_NAME, { persistenceMethod: 'fs' });
exports.router.post('/image', upload.single('image'), function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var col, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, utils_1.loadCollection(COLLECTION_NAME, db)];
            case 1:
                col = _a.sent();
                data = col.insert(req.file);
                db.saveDatabase();
                res.send({
                    id: data.$loki,
                    fileName: data.filename,
                    originalName: data.originalname
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.sendStatus(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// router.post('/image', upload.array('photo', 10), async (req, res) => {
//   try {
//       const col = await loadCollection(COLLECTION_NAME, db);
//       const data = [].concat(col.insert(req.files));
//       db.saveDatabase();
//       res.send(data.map(x => ({
//         id: x.$loki,
//         fileName: x.filename,
//         originalName: x.originalname
//       })));
//   } catch (err) {
//       res.sendStatus(400);
//   }
// });
exports.router.get('/image', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var col, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, utils_1.loadCollection(COLLECTION_NAME, db)];
            case 1:
                col = _a.sent();
                res.send(col.data);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.sendStatus(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.router.get('/image/:id', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var col, result, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, utils_1.loadCollection(COLLECTION_NAME, db)];
            case 1:
                col = _a.sent();
                result = col.get(req.params.id);
                if (!result) {
                    res.sendStatus(404);
                    return [2 /*return*/];
                }
                res.setHeader('Content-Type', result.mimetype);
                fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.sendStatus(400);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=api.js.map