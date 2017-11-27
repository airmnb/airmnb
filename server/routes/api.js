'user strict';
"use strict";
exports.__esModule = true;
var express = require("express");
exports.router = express.Router();
/* GET api listing. */
exports.router.get('/', function (req, res) {
    res.send('api works');
});
