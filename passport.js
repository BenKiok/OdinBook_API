const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcryptjs'),
      passportJWT = require('passport-jwt'),
      User = require('./models/User'),
      JWTStrategy = passportJWT.Strategy,
      ExtractJWT = passportJWT.ExtractJwt;

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