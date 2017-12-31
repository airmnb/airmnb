require('dotenv').config();
// Get dependencies
// Get dependencies
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import * as multer from 'multer';
import * as cors from 'cors';
import * as fs from 'fs';
import * as Loki from 'lokijs';
import * as bodyParser from 'body-parser';
import * as fileUpload from "express-fileupload";
import { environment } from './src/environments/environment';
// Get our API routes
import * as api from './server/routes/api';

const privateKey  = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());
app.use((req, res, next) => {
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
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const shouldHttp = !!process.env.HTTP_ONLY || false;
const port = process.env.PORT || (shouldHttp ? '80' : '443');
app.set('port', port);

if(shouldHttp) {
  // HTTP
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => console.log(`HTTP running on localhost:${port}`));
}else{
  // HTTPS
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(port, () => console.log(`HTTPS running on localhost:${port}`));
}
