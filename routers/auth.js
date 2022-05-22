const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      auth_controller = require('../controllers/auth');

router.post('/signup', auth_controller.user_signup_POST);
router.get('/login/facebook', passport.authenticate('facebook'));
router.post('/login', auth_controller.user_login_POST);
router.get('/oauth2/redirect/facebook', auth_controller.facebook_login_GET);

module.exports = router;