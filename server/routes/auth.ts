'user strict';
import * as express from 'express';
import * as passport from "passport";
import * as passport_google from 'passport-google-oauth20';
const GoogleStrategy = passport_google.Strategy;
import env from '../env';
import { dataGatewayFactory } from "../data/gateway";
import { Account } from '../../types';
import * as uuid from "uuid";

export const passportMiddleware = passport;
export const router = express.Router();

const host = process.env.URL_HOST || "localhost";
const accountApi = dataGatewayFactory.produce('account');

passport.use(new GoogleStrategy({
  clientID: env.googleClientId,
  clientSecret: env.googleClientSecret,
  callbackURL: `https://${host}/auth/google/callback`
},
async (accessToken, refreshToken, profile, cb) => {
  // console.log('Google SSO profile', JSON.stringify(profile));
  const email = profile.emails[0].value;
  let account : Account = await accountApi.queryOne({name: email});
  if(!account) {
    account = {
      id: uuid.v4(),
      email: email,
      name: email,
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
  (req, res) => {
    const account = req['user'];
    // console.log('Google SSO request', JSON.stringify(req['user']));
    // Successful authentication, redirect home.
    const c = {
      account,
      role: 0
    };
    res.cookie('c', JSON.stringify(c));
    res.redirect('/');
  });
