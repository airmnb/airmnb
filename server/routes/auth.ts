'user strict';
import * as express from 'express';
import * as passport from "passport";
import * as passport_google from 'passport-google-oauth20';
const GoogleStrategy = passport_google.Strategy;
import * as passport_facebook from 'passport-facebook';
const FacebookStrategy = passport_facebook.Strategy;
import env from '../env';
import { dataGatewayFactory } from "../data/gateway";
import { Account } from '../../types';
import * as uuid from "uuid";

export const passportMiddleware = passport;
export const router = express.Router();

const host = process.env.URL_HOST || "localhost";
const accountApi = dataGatewayFactory.produce('account');

/**
 * Google SSO settings
 */
passport.use(new GoogleStrategy({
  clientID: env.googleClientId,
  clientSecret: env.googleClientSecret,
  callbackURL: `https://${host}/auth/google/callback`
},
async (accessToken, refreshToken, profile, cb) => {
  console.log('Google SSO profile', JSON.stringify(profile));
  const email = profile.emails[0].value;
  let account : Account = await accountApi.queryOne({displayName: profile.displayName, provider: 'google'});
  if(!account) {
    account = {
      id: uuid.v4(),
      email: email,
      name: email + '@google',
      displayName: email,
      provider: 'google',
      secret: null,
      enabled: true
    };
    await accountApi.create(account);
  }
  cb(null, account);
}
));

passport.use(new FacebookStrategy({
  clientID: env.facebookAppId,
  clientSecret: env.facebookAppSecret,
  callbackURL: `https://${host}/auth/facebook/callback`
},
async (accessToken, refreshToken, profile, cb) => {
  console.log('Facebook SSO profile', JSON.stringify(profile));
  let account : Account = await accountApi.queryOne({displayName: profile.displayName, provider: 'facebook'});
  if(!account) {
    account = {
      id: uuid.v4(),
      email: null,
      name: profile.id + '@facebook',
      displayName: profile.displayName,
      provider: 'facebook',
      secret: null,
      enabled: true
    };
    await accountApi.create(account);
  }
  cb(null, account);
}
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});


// Google SSO
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => handleSsoAccount(req, res, 'google'));

// Facebook SSO
router.get('/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => handleSsoAccount(req, res, 'facebook'));

function handleSsoAccount(req, res, provider) {
  const account = req['user'];
  // console.log('SSO request from', provider, JSON.stringify(req['user']));
  // Successful authentication, redirect home.
  const c = {
    account,
    role: 0
  };
  res.cookie('c', JSON.stringify(c));
  res.redirect('/');
}
