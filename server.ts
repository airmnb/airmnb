require('dotenv').config();
// Get dependencies
// Get dependencies
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as multer from 'multer';
import * as cors from 'cors';
import * as fs from 'fs';
import * as Loki from 'lokijs';
import * as bodyParser from 'body-parser';
import * as fileUpload from "express-fileupload";
import { environment } from './src/environments/environment';
// Get our API routes
import * as api from './server/routes/api';

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/image', express.static(path.join(__dirname, 'image')));

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
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
