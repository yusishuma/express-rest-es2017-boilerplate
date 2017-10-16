const JwtStrategy = require('passport-jwt').Strategy;
const BearerStrategy = require('passport-http-bearer');
const { ExtractJwt } = require('passport-jwt');
const { jwtSecret } = require('./vars');
const authProviders = require('../api/services/authProviders');
const User = require('../api/models/user.model');
const OAuth2 = require('passport-oauth').OAuth2Strategy;

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer')
};

const jwt = async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) return done(null, user);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

const oAuth = service => async (token, done) => {
  try {
    const userData = await authProviders[service](token);
    const user = await User.oAuthLogin(userData);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
exports.facebook = new BearerStrategy(oAuth('facebook'));
exports.google = new BearerStrategy(oAuth('google'));
exports.OAuth2Strategy = new OAuth2({
  authorizationURL: 'https://www.provider.com/oauth2/authorize',
  tokenURL: 'https://www.provider.com/oauth2/token',
  clientID: '123-456-789',
  clientSecret: 'shhh-its-a-secret',
  callbackURL: 'https://www.example.com/auth/provider/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({}, (err, user) => {
    done(err, user);
  });
});
