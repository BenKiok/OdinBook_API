const passport = require('passport'),
      FacebookStrategy = require('passport-facebook'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcryptjs'),
      passportJWT = require('passport-jwt'),
      User = require('./models/User'),
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT = passportJWT.ExtractJwt;
require('dotenv').config();

passport.use(new LocalStrategy(
  (username, password, cb) => {
    User.findOne({username: username}, (err, user) => {
      if (err) { 
        return cb(err);
      }
      if (!user) {
        return cb(null, false, {message: "Incorrect username"});
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return cb(null, user);
        } else {
          return cb(null, false, {message: "Incorrect password"});
        }
      });
    });
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'dis_a_secret'
  },
  (jwt_payload, cb) => {
    return User.findById(jwt_payload._id)
      .then(user => {
        return cb(null, user);
      })
      .catch(err => {
        return cb(err);
      })
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env['FB_APP_ID'],
    clientSecret: process.env['FB_APP_SECRET'],
    callbackURL: `http://localhost:${process.env.PORT}/api/oauth2/redirect/facebook`
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ facebookId: profile.id }, (err, user) => {
      if (err) {
        return cb(err);
      }
      if (!user) {
        let user = new User({
          username: profile.displayName,
          postsLiked: [],
          friendRequestsFrom: [],
          friends: [],
          facebookId: profile.id
        });

        user.save((err, user) => {
          if (err) {
            return cb(err);
          }

          return cb(null, user);
        })
      } else {
        if (err) {
          return cb(err);
        }
        
        return cb(null, user);
      }
    });
  }
));