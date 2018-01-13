'user strict';
import * as express from 'express';
import * as passport from "passport";
import * as passport_google from 'passport-google-oauth20';
const GoogleStrategy = passport_google.Strategy;
import env from '../env';

export const passportMiddleware = passport;
export const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: env.googleClientId,
  clientSecret: env.googleClientSecret,
  callbackURL: "https://localhost/auth/google/callback"
},
(accessToken, refreshToken, profile, cb) => {
  cb(null, profile);
  // User.findOrCreate({ googleId: profile.id }, (err, user) => {
  //   return cb(err, user);
  // });
}
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});


// Google SSO
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
