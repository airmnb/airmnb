"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!process.env.IS_PROD) {
    console.log("Debug >>>> loading dotenv", process.env.IS_PROD);
    require('dotenv').config();
}
// Get dependencies
// Get dependencies
var express = require("express");
var path = require("path");
var http = require("http");
var https = require("https");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
// Get our API routes
var api = require("./server/routes/api");
var privateKey = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('cert.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var app = express();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/image', express.static(path.join(__dirname, 'image')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.use((req, res, next) => {
//   console.log('>>>', req.method, req.url);
//   next();
// });
// Set our api routes
app.use('/api', api.router);
// Catch all other routes and return the index file
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
/**
 * Get port from environment and store in Express.
 */
var shouldHttp = !!process.env.HTTP_ONLY || false;
var port = process.env.PORT || (shouldHttp ? '80' : '443');
app.set('port', port);
if (shouldHttp) {
    // HTTP
    var httpServer = http.createServer(app);
    httpServer.listen(port, function () { return console.log("HTTP running on localhost:" + port); });
}
else {
    // HTTPS
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, function () { return console.log("HTTPS running on localhost:" + port); });
}
//# sourceMappingURL=server.js.map