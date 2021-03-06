if(!process.env.IS_PROD) {
  console.log("Debug >>>> loading dotenv", process.env.IS_PROD);
  require('dotenv').config();
}

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
// Get our API routes
import * as apiRouter from './server/routes/api';
import * as authRouter from './server/routes/auth';

// import * as passport from "passport";
// import * as passport_google from 'passport-google-oauth20';
// const GoogleStrategy = passport_google.Strategy;

import env from './server/env';
import {config} from './configs/config';

import {createConnection} from './server/pg/pg';
import { ServerOptions } from 'https';

// createConnection().then(c => console.log('pg done')).catch(e => console.log('pg failed', e));

// passport.use(new GoogleStrategy({
//   clientID: environment.googleClientId,
//   clientSecret: environment.googleClientSecret,
//   callbackURL: "https://localhost/auth/google/callback"
// },
// (accessToken, refreshToken, profile, cb) => {
//   cb(null, profile);
//   // User.findOrCreate({ googleId: profile.id }, (err, user) => {
//   //   return cb(err, user);
//   // });
// }
// ));

// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });

// passport.deserializeUser((obj, cb) => {
//   cb(null, obj);
// });

const app = express();

// Redirect HTTP to HTTPS
app.use ((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect('https://' + req.headers.host + req.url);
  }
});

// Parsers for POST data
app.use(bodyParser.json({limit: '5mb'}));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
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
app.use(authRouter.passportMiddleware.initialize());
app.use(authRouter.passportMiddleware.session());
// app.use((req, res, next) => {
//   console.log('>>>', req.method, req.url);
//   next();
// });
// Set our api routes
app.use('/auth', authRouter.router);
app.use('/api', apiRouter.router);

// // Google SSO
// app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('');
//   });

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  // Hand over unknown requests to Angular
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});



/**
 * Get port from environment and store in Express.
 */
// app.set('port', port);

// HTTP
const http_port = env.http_port || "80";
const httpServer = http.createServer(app);
httpServer.listen(http_port, () => console.log(`HTTP running on port ${http_port}`));

// HTTPS
const https_port = env.https_port || "443";
const credentials: ServerOptions = { 
  key: fs.readFileSync(config.key_file), 
  cert: fs.readFileSync(config.crt_file),
  ca: config.ca_files.map(x => fs.readFileSync(x))
};
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(https_port, () => console.log(`HTTPS running on port ${https_port}`));
