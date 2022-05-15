const User = require('../models/User'),
      bcrypt = require('bcryptjs'),
      passport = require('passport'),
      jwtoken = require('jsonwebtoken'),
      {body, validationResult} = require('express-validator');

exports.user_signup_POST = [
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(req.body);
    } else {
      User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
          return next(err);
        } else if (user && user.username) {
          res.json('User already exists.');
        } else {
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              next(err);
            }
        
            const user = new User({
              username: req.body.username,
              password: hashedPassword,
              postsLiked: [],
              friendRequestsFrom: [],
              friends: []
            });
            
            user.save((err, user) => {
              if (err) {
                return next(err);
              }
                
              return res.json(user);
            });
          });
        }
      });
    }
  }
]

exports.user_login_POST = [
  body('username').notEmpty().trim().escape(),
  body('password').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json(req.body);
    } else {
      passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
          return res.status(400).send('Bad request');
        }
    
        req.login(user, {session: false}, err => {
          if (err) {
            return next(err);
          }
          
          const token = jwtoken.sign(user.toJSON(), 'dis_a_secret');
          return res.json({user, token});
        });
      })(req, res);
    }
  }
]